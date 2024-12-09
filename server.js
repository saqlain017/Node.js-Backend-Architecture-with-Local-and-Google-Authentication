import { connectDB } from './src/config/db.js';
import { createApp } from './src/app.js';
import { PORT } from './src/config/env.js';

const startServer = async () => {
  try {
    await connectDB();

    const app = createApp();

    const Server_PORT = PORT || 5001;
    app.listen(Server_PORT, () => {
      console.log(`Server running on port: ${Server_PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error.message);
  }
};

startServer();
