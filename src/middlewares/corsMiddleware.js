// Handles Cross-Origin Resource Sharing (CORS) to control access to your resources from different origins.
import cors from 'cors';

export const corsMiddleware = cors({
  origin: ['https://roamdigi.com', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  credentials: true,
  optionsSuccessStatus: 204,
});
