import mongoose from 'mongoose';
import 'dotenv/config';

const { URI } = process.env;
const db = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Base de datos conectada');
  } catch (error) {
    console.log('🚀 ~ file: app.js:39 ~ error:', error);
  }
};

export default db;
