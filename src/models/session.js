import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, CSRF_SECRET } from '../config/env.js';

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  csrfToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Static methods to manage session tokens
sessionSchema.statics.initSession = async function (userId) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '14d' });
  const csrfToken = jwt.sign({ userId, timestamp: Date.now() }, CSRF_SECRET);

  const newSession = new this({ userId, token, csrfToken });
  await newSession.save();

  return { token, csrfToken };
};

sessionSchema.statics.expireSession = async function (token) {
  return await this.deleteOne({ token });
};

sessionSchema.statics.expireAllForUsers = async function (userId) {
  return await this.deleteMany({ userId });
};

const Session = mongoose.model('Session', sessionSchema);

export default Session;
