// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import dealerRoutes from './routes/dealerRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import searchRoute from './routes/searchRoute.js';
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', staffRoutes)
app.use('/api/users', dealerRoutes)
app.use('/api', adminRoutes)
app.use('/api/auth', authRoutes);

//Lead Routes
app.use("/api/leads", leadRoutes);

app.use('/api/properties', propertyRoutes);
app.use('/api', searchRoute);

app.get('/',(req,res)=>{
    res.send("API Working....")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;