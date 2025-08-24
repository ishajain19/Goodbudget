import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import transactionsRouter from './routes/transactions.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', credentials: true }));
app.get('/api/health', (req,res)=>res.json({status:'ok'}));
app.use('/api/transactions', transactionsRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expense_tracker';

mongoose.connect(MONGO_URI)
  .then(()=> app.listen(PORT, ()=>console.log(`API on http://localhost:${PORT}`)))
  .catch(err=>{ console.error('Mongo error', err); process.exit(1); });
