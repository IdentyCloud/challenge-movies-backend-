import mongoose from 'mongoose';

(async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    throw new Error(`Error connecting to database: ${error}`);
  }
})();