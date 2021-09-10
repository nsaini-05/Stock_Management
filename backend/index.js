import express from "express";
import userRoutes from "./routes/userRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import errorMiddleware from "./middlewares/errors.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

import { database } from "./database.js";
const PORT = process.env.PORT;

const dbConnection = database();
dbConnection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("/user", userRoutes);
app.use("/stock", stockRoutes);

app.get("/", (req, res) => {
  res.send("Hello to STMS API");
});

//Middleware to handle error
app.use(errorMiddleware);
