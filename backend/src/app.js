import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import patientRoutes from './routes/patient.routes.js';
import providerRoutes from './routes/provider.routes.js';
import goalRoutes from './routes/goal.routes.js';
import publicRoutes from './routes/public.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/public', publicRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
