import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import createHttpError from "http-errors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import Bull from "bull";
import { Server } from "ws";
import { createServer } from "http";
import { ErrorController } from "../interface/controller/ErrorController";
import { router } from "./router";

dotenv.config();

const API_PORT = process.env.API_PORT || 8000;
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const app = express();
const server = createServer(app);
const prisma = new PrismaClient();
const queue = new Bull("simulate", `redis://${REDIS_HOST}:${REDIS_PORT}`);
const wss = new Server({ server });
const errorController = new ErrorController();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/api", router(prisma, queue, wss))
  .use((req, res, next) => {
    next(new createHttpError.NotFound("Requested API is not found."));
  })
  .use((err: Error, req: Request, res: Response, next: NextFunction) => {
    try {
      errorController.get(err, req, res);
    } catch (err) {
      next(err);
    }
  });
server.listen(API_PORT, () => console.log(`Listening on ${API_PORT}...`));
