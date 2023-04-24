import mongoose from 'mongoose';

const userCollection = 'Users';

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    toJSON: {
      transform: function (_doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

const User = mongoose.model(userCollection, userSchema);

export default User;
