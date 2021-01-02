import express from "express";
import router from "./router";
import { notFoundError, errorHandler } from "./ErrorHandler";

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(notFoundError);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
