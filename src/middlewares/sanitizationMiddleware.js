// Cleans user inputs to prevent injection attacks like SQL injection or XSS.
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

export const sanitizationMiddleware = [
  mongoSanitize(),
  xss(),
];
