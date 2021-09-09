import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const registerUser = async (req, res, next) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
