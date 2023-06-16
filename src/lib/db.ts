import mongoose from 'mongoose';

let isConnected = false;

export const db = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || '', {
      dbName: 'mindmuse',
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
