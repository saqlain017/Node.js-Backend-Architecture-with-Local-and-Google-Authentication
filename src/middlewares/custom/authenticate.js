import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env.js';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      errors: [
        {
          title: 'Unauthorized',
          detail: 'You must provide a valid token.',
          code: 'ERR_NO_TOKEN',
        },
      ],
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      errors: [
        {
          title: 'Unauthorized',
          detail: 'Invalid or expired token.',
          code: 'ERR_INVALID_TOKEN',
        },
      ],
    });
  }
};
