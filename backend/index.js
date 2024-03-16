import dotenv from "dotenv";
dotenv.configDotenv();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

import BookRoutes from "./routes/bookRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'))

app.use('/book', BookRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected");
    });
  })
  .catch((error) => {
    console.log(error);
  });
