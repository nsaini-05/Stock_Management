import express from "express";
import userRoutes from "./routes/userRoutes.js";
const app = express();

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

app.get("/", (req, res) => {
  res.send("Hello to STMS API");
});
