import app from './src/app.js';
import connectDB from './src/config/database.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}`);
  console.log(`🔍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});
