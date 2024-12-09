import express from 'express';
import { applyMiddlewares } from './middlewares/index.js';
import authRoutes from './routes/authRoutes.js';
import './services/googleStrategy.js'

export const createApp = () => {
  const app = express();

  applyMiddlewares(app);

  app.use('/api/auth', authRoutes);

  app.use((req, res) => {
    return res.status(404).json({ message: 'Route not found' });
  });

  app.use((err, req, res, next) => {
    console.error(err);
    return res.status(err.status || 500).json({
      error: err.message || 'Internal Server Error',
    });
  });

  return app;
};
