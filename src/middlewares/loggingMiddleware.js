// Logs incoming requests and errors for debugging and monitoring purposes.
import morgan from 'morgan';

export const loggingMiddleware = morgan('combined');
