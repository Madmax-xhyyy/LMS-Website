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


//Stripe webhooks
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle successful payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { purchaseId } = session.metadata;

    try {
      const purchaseData = await Purchase.findById(purchaseId);
      const userData = await User.findById(purchaseData.userId);
      const courseData = await Course.findById(purchaseData.courseId);

      if (!purchaseData || !userData || !courseData) {
        console.error("Missing data in webhook");
        return res.status(400).send("Invalid purchase references");
      }

      // Update relationships
      if (!courseData.enrolledStudents.includes(userData._id)) {
        courseData.enrolledStudents.push(userData._id);
        await courseData.save();
      }

      if (!userData.enrolledCourses.includes(courseData._id)) {
        userData.enrolledCourses.push(courseData._id);
        await userData.save();
      }

      purchaseData.status = "Completed";
      await purchaseData.save();

      console.log("✅ Payment completed for purchase:", purchaseId);
    } catch (error) {
      console.error("Error processing webhook:", error);
      return res.status(500).send("Server error");
    }
  }

  // ✅ Handle failed payments
  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;
    const session = await stripe.checkout.sessions.list({
      payment_intent: paymentIntent.id,
    });

    if (session.data.length > 0) {
      const { purchaseId } = session.data[0].metadata;
      const purchaseData = await Purchase.findById(purchaseId);
      if (purchaseData) {
        purchaseData.status = "Failed";
        await purchaseData.save();
      }
    }
  }

  res.json({ received: true });
};