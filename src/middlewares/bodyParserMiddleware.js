// Parses incoming request bodies (e.g., JSON) to make them accessible
import express from 'express';

export const bodyParserMiddleware = [
  express.json({ limit: '10kb' }),
  express.urlencoded({ extended: true, limit: '10kb' }),
];
