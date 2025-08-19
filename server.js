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

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', staffRoutes)
app.use('/api/users', dealerRoutes)
app.use('/api', adminRoutes)
app.use('/api/auth', authRoutes);

app.use('/api/properties', propertyRoutes);
app.use('/api', searchRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;