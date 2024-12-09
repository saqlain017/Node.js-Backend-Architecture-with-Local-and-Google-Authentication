import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET,CSRF_SECRET } from '../config/env.js';

export const initSession = async (userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '14d',
  });
  const csrfToken = jwt.sign({ userId, timestamp: Date.now() }, CSRF_SECRET);

  return { token, csrfToken };
};

export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const validatePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};
