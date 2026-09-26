import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },

  age: {
    type: Number,
    min: 18,
    required: true
  },

  phoneNumber: {
    type: String
  },

  password: {
    type: String,
    minlength: 8,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date
  }
});

export default mongoose.model("User", userSchema);
