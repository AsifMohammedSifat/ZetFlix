import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  name: {
    required: [true, "Name is required"],
    type: String,
    trim: true,
  },
  email: {
    required: [true, "Email is required"],
    type: String,
    trim: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    required: [true, "Password is required"],
    type: String,
    minlength: [6, "Password should be at least 6 characters long"],
  },
  phone: {
    required: [true, "Phone number is required"],
    type: String,
    trim: true,
    match: [/^\d{10}$/, "Please enter a valid phone number"],
  },
});

const userModel = mongoose.models?.users || mongoose.model("users", schema);

export default userModel;
