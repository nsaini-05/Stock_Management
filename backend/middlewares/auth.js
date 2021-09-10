import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(
        new ErrorHandler("Login first to access this resource.", 401)
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
