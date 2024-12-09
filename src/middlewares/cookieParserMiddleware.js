import cookieParser from 'cookie-parser';
import { NODE_ENV } from '../config/env.js';

export const cookieParserMiddleware = cookieParser('your_secret_key', {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'lax',
});
