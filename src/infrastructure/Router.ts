import express, { NextFunction, Request, Response } from "express";
import { createConnection } from "typeorm";
import { FeederController } from "../interface/controller/FeederController";
import { NodeController } from "../interface/controller/NodeController";
import { LineController } from "../interface/controller/LineController";
import { FeederRepository } from "../interface/gateway/FeederRepository";
import { NodeRepository } from "../interface/gateway/NodeRepository";
import { LineRepository } from "../interface/gateway/LineRepository";
import { FeederListInteractor } from "../usecase/feeder/list/FeederListInteractor";
import { NodeListInteractor } from "../usecase/node/list/NodeListInteractor";
import { LineListInteractor } from "../usecase/line/list/LineListInteractor";

const router = express.Router();

createConnection("development").then((connection) => {
  const feederRepository = new FeederRepository(connection);
  const nodeRepository = new NodeRepository(connection);
  const lineRepository = new LineRepository(connection);

  const feederList = new FeederListInteractor(feederRepository);
  const nodeList = new NodeListInteractor(nodeRepository);
  const lineList = new LineListInteractor(lineRepository);

  const feederController = new FeederController(feederList);
  const nodeController = new NodeController(nodeList);
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
      await nodeController.list(req, res, next);
    }
  );

  router.get(
    "/nodes",
    async (req: Request, res: Response, next: NextFunction) => {
      await lineController.list(req, res, next);
    }
  );
});

export default router;
