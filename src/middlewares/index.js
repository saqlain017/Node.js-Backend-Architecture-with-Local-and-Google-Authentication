import { helmetMiddleware } from './helmetMiddleware.js';
import { corsMiddleware } from './corsMiddleware.js';
import { rateLimitMiddleware } from './rateLimitMiddleware.js';
import { bodyParserMiddleware } from './bodyParserMiddleware.js';
import { sanitizationMiddleware } from './sanitizationMiddleware.js';
import { compressionMiddleware } from './compressionMiddleware.js';
import { loggingMiddleware } from './loggingMiddleware.js';
import { cookieParserMiddleware } from './cookieParserMiddleware.js';
import passport from "passport"

export const applyMiddlewares = (app) => {
  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(rateLimitMiddleware);
  app.use(bodyParserMiddleware);
  app.use(sanitizationMiddleware);
  app.use(compressionMiddleware);
  app.use(loggingMiddleware);
  app.use(cookieParserMiddleware);
  app.use(passport.initialize());
};
