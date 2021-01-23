import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import { notFoundError, errorHandler } from "./ErrorHandler";

dotenv.config();

const PORT = process.env.API_PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);
app.use(notFoundError);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
