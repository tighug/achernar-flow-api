import express, { NextFunction, Request, Response } from "express";
import { FeederController } from "../interface/controller/FeederController";
import { NodeController } from "../interface/controller/NodeController";
import { LineController } from "../interface/controller/LineController";
import { FeederRepository } from "../interface/gateway/FeederRepository";
import { NodeRepository } from "../interface/gateway/NodeRepository";
import { LineRepository } from "../interface/gateway/LineRepository";
import { FeederListInteractor } from "../usecase/feeder/list/FeederListInteractor";
import { NodeListInteractor } from "../usecase/node/list/NodeListInteractor";
import { LineListInteractor } from "../usecase/line/list/LineListInteractor";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

const feederRepository = new FeederRepository(prisma);
const nodeRepository = new NodeRepository(prisma);
const lineRepository = new LineRepository(prisma);

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
  "/nodes",
  async (req: Request, res: Response, next: NextFunction) => {
    await nodeController.list(req, res, next);
  }
);

router.get(
  "/lines",
  async (req: Request, res: Response, next: NextFunction) => {
    await lineController.list(req, res, next);
  }
);

export default router;
