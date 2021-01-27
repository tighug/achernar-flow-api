import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import createHttpError from "http-errors";
import { ErrorController } from "../interface/controller/ErrorController";

dotenv.config();

const PORT = process.env.API_PORT || 8000;
const app = express();
const errorController = new ErrorController();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);

app.use((req, res, next) => {
  next(new createHttpError.NotFound("Requested API is not found."));
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    errorController.get(err, req, res);
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
