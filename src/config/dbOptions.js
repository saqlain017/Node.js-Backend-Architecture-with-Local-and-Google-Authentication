import { DB_AUTO_INDEX, DB_MAX_IDLE_TIME, DB_POOL_SIZE, DB_SERVER_SELECTION_TIMEOUT,DB_RETRY_WRITES,DB_SOCKET_TIMEOUT } from "./env.js";

export const dbOptions = {
    serverSelectionTimeoutMS: DB_SERVER_SELECTION_TIMEOUT, 
    socketTimeoutMS: DB_SOCKET_TIMEOUT,
    autoIndex: DB_AUTO_INDEX === 'false',
    maxIdleTimeMS: DB_MAX_IDLE_TIME,
    retryWrites: DB_RETRY_WRITES === 'true',
  };
  