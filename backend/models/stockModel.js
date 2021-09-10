import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const stockSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Stock name"],
    maxLength: [30, "Your name cannot exceed 30 Characters"],
    minLength: [1, "Invalid Name"],
  },

  quantity: {
    type: "Number",
    default: 0,
    min: [0, "Stock cannot be less than 0"],
  },

  price: {
    type: "Number",
    default: 0,
    min: [0, "Price cannot be less than 0"],
  },
});

export const Stock = mongoose.model("Stock", stockSchema);
