import express from "express";
import userRoutes from "./routes/userRoutes.js";
import errorMiddleware from "./middlewares/errors.js";
const app = express();
app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("Hello to STMS API");
});

//Middleware to handle error
app.use(errorMiddleware);
