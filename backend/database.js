import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;
export const database = () =>
  mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
