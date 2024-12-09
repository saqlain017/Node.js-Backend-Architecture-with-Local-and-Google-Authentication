import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const DB_SERVER_SELECTION_TIMEOUT= Number(process.env.DB_SERVER_SELECTION_TIMEOUT) 
export const DB_SOCKET_TIMEOUT=Number(process.env.DB_SOCKET_TIMEOUT)       
export const DB_POOL_SIZE=Number(process.env.DB_POOL_SIZE)             
export const DB_AUTO_INDEX = process.env.DB_AUTO_INDEX               
export const DB_MAX_IDLE_TIME=Number(process.env.DB_MAX_IDLE_TIME)
export const DB_RETRY_WRITES=process.env.DB_RETRY_WRITES 
export const CSRF_SECRET = process.env.CSRF_SECRET
export const NODE_ENV = process.env.NODE_ENV