import express, { NextFunction, Request, Response } from "express";
import { createConnection } from "typeorm";
import { FeederController } from "../interface/controller/FeederController";
import { JointController } from "../interface/controller/JointController";
import { LineController } from "../interface/controller/LineController";
import { FeederRepository } from "../interface/gateway/FeederRepository";
import { JointRepository } from "../interface/gateway/JointRepository";
import { LineRepository } from "../interface/gateway/LineRepository";
import { FeederListInteractor } from "../usecase/feeder/list/FeederListInteractor";
import { JointListInteractor } from "../usecase/joint/list/JointListInteractor";
import { LineListInteractor } from "../usecase/line/list/LineListInteractor";

const router = express.Router();

createConnection("development").then((connection) => {
  const feederRepository = new FeederRepository(connection);
  const jointRepository = new JointRepository(connection);
  const lineRepository = new LineRepository(connection);

  const feederList = new FeederListInteractor(feederRepository);
  const jointList = new JointListInteractor(jointRepository);
  const lineList = new LineListInteractor(lineRepository);

  const feederController = new FeederController(feederList);
  const jointController = new JointController(jointList);
  const lineController = new LineController(lineList);

  router.get(
    "/feeders",
    async (req: Request, res: Response, next: NextFunction) => {
      await feederController.list(req, res, next);
    }
  );

  router.get(
    "/joints",
    async (req: Request, res: Response, next: NextFunction) => {
      await jointController.list(req, res, next);
    }
  );

  router.get(
    "/lines",
    async (req: Request, res: Response, next: NextFunction) => {
      await lineController.list(req, res, next);
    }
  );
});

export default router;
