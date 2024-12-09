// Compresses HTTP responses to reduce payload size and improve performance.
import compression from 'compression';

export const compressionMiddleware = compression();
