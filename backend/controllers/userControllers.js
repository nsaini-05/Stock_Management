import { User } from "../models/userModel.js";

import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";

export const registerUser = async (req, res, next) => {
  const user = req.body;
  const newUser = new User(user);
  if (req.user) {
    return next(new ErrorHandler("Logout first", 404));
  }

  try {
    await newUser.save();
    sendToken(newUser, 200, res);
    // res.status(201).json(token);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (req.user) {
    return next(new ErrorHandler("You are already loggedin", 404));
  }

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

    sendToken(user, 200, res);

    // res.status(201).json({ token });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

export const logoutUser = async (req, res) => {
  if (req.user) {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({ success: true, message: "Logged Out" });
  }

  res.status(500).json({ success: true, message: "You are not logged In" });
};

export const addBalance = async (req, res, next) => {
  const user = req.user;
  const { amount, cardNumber, cvv } = req.body;

  try {
    user.balance += amount;
    await user.save();
    res.json(user);
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

export const getPorfolio = async (req, res, next) => {
  const user = req.user;

  res.status(200).send(user);
};

function reducer(total, num) {
  return total + num;
}
