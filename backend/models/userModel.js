import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Your name cannot exceed 30 Characters"],
    minLength: [1, "Invalid Name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "Email is already signed up"],
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`,
      isAsync: false,
    },
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minLength: [6, "Password cannot be less than 6 Characters"],
    select: false,
  },
  stocks: [{}],
  balance: {
    type: "Number",
    default: 0,
    min: [0, "Balance cannot be less than 0"],
  },
});

export const User = mongoose.model("User", userSchema);
