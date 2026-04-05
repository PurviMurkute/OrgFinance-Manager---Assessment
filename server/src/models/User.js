import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (username) => username.length >= 6,
      message: "Username must be at least 6 characters long",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["viewer", "analyst", "admin"],
    default: "viewer",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const User = model("User", userSchema);

export default User;
