import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebHooks } from './controllers/webhooks.js';

// Initialize Express
const app = express();

// COnnect To Database
await connectDB();

// Middlewares
app.use(cors());

app.use(express.json());

// Routes
app.get('/', (req, res)=> res.send('Api working'));
app.post("/clerk", express.raw({ type: "application/json" }), clerkWebHooks);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
  console.log(`Server is running on server ${PORT}`);
})

