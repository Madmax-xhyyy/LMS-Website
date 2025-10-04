import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebHooks = async (req, res)=> {
  try{
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body),{
      "svix-id" : req.headers["svix-id"],
      "svix-timestamp" : req.headers["svix-timestamp"],
      "svix-signature" : req.headers["svix-signature"]
    });

    const {data, type} = req.body;
    switch(type){
      case 'user.created':{
        const userData = {
          _id: data.id,
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          imageUrl: data.image_url,
        }
        await User.create(userData);
        res.json({});
        break;
      }
      case 'user.updated':{
        const userData = {
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          imageUrl: data.image_url,
        }
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case 'user.deleted':{
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        break;
    }
  }catch(error){
    res.json({success: false, message: error.message});
    console.log("something wrong with the api function controller");
  }
}

const stripeInstance = new Stripe(process.env.STRIPE_WEBHOOK_SECRET);
//Stripe webhooks
export const stripeWebhooks = async(request, response)=> {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️ Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }

    switch (event.type) {
    case 'payment_intent.succeeded':
      {
      const paymentIntent = event.data.object;
      const paymentIntendId = paymentIntent.id;
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntendId
      });
      const {purchaseId} = session.data[0].metadata;
      const purchaseData = await Purchase.findById(purchaseId);
      const userData = await User.findById(purchaseData.userId);
      const courseData = await Course.findById(purchaseId.courseId.toString());

      courseData.enrolledStudents.push(userData);
      await courseData.save();

      userData.enrolledCourses.push(courseData._id);
      await userData.save();

      purchaseData.status = 'Completed';
      await purchaseData.save();

      break;
    }
    case 'payment_method.payment_failed':
      {
       const paymentIntent = event.data.object;
      const paymentIntendId = paymentIntent.id;
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntendId
      });
      const {purchaseId} = session.data[0].metadata;

      const purchaseData = await Purchase.findById(purchaseId);
      purchaseData.status = 'failed';
      await purchaseData.save();
      
      break;
    }
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
  }

}