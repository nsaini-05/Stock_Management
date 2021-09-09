import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const registerUser = async (req, res, next) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 404));
  }
  try {
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 404));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    res.status(201).json({ message: "Logged in Successfully" });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};
