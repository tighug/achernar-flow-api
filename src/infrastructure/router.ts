import express, { NextFunction, Request, Response } from "express";
import { FeederController } from "../interface/controller/FeederController";
import { NodeController } from "../interface/controller/NodeController";
import { LineController } from "../interface/controller/LineController";
import { FeederRepository } from "../interface/gateway/FeederRepository";
import { NodeRepository } from "../interface/gateway/NodeRepository";
import { LineRepository } from "../interface/gateway/LineRepository";
import { FeederList } from "../usecase/feeder/list/FeederList";
import { NodeList } from "../usecase/node/list/NodeList";
import { LineList } from "../usecase/line/list/LineList";
import { PrismaClient } from "@prisma/client";
import { SampleRepository } from "../interface/gateway/SampleRepository";
import { SampleList } from "../usecase/sample/list/SampleList";
import { SampleController } from "../interface/controller/SampleController";
import { CaseController } from "../interface/controller/CaseController";
import { CaseRepository } from "../interface/gateway/CaseRepository";
import { CaseRegister } from "../usecase/case/register/CaseRegister";
import { CaseGet } from "../usecase/case/get/CaseGet";
import { CaseList } from "../usecase/case/list/CaseList";
import { CaseDelete } from "../usecase/case/delete/CaseDelete";

const router = express.Router();
const prisma = new PrismaClient();

const feederRepository = new FeederRepository(prisma);
const nodeRepository = new NodeRepository(prisma);
const lineRepository = new LineRepository(prisma);
const sampleRepository = new SampleRepository(prisma);
const caseRepository = new CaseRepository(prisma);

const feederList = new FeederList(feederRepository);
const nodeList = new NodeList(nodeRepository);
const lineList = new LineList(lineRepository);
const sampleList = new SampleList(sampleRepository);
const caseRegister = new CaseRegister(caseRepository, feederRepository);
const caseGet = new CaseGet(caseRepository);
const caseList = new CaseList(caseRepository);
const caseDelete = new CaseDelete(caseRepository);

const feederController = new FeederController(feederList);
const nodeController = new NodeController(nodeList);
const lineController = new LineController(lineList);
const sampleController = new SampleController(sampleList);
const caseController = new CaseController(
  caseRegister,
  caseGet,
  caseList,
  caseDelete
);

router.get(
  "/feeders/:feederId/nodes",
  async (req: Request, res: Response, next: NextFunction) => {
    await nodeController.list(req, res, next);
  }
);

router.get(
  "/feeders/:feederId/lines",
  async (req: Request, res: Response, next: NextFunction) => {
    await lineController.list(req, res, next);
  }
);

router.get(
  "/feeders/:feederId/cases",
  async (req: Request, res: Response, next: NextFunction) => {
    await caseController.list(req, res, next);
  }
);

router.get(
  "/feeders",
  async (req: Request, res: Response, next: NextFunction) => {
    await feederController.list(req, res, next);
  }
);

router.get(
  "/samples",
  async (req: Request, res: Response, next: NextFunction) => {
    await sampleController.list(req, res, next);
  }
);

router.post(
  "/cases",
  async (req: Request, res: Response, next: NextFunction) => {
    await caseController.register(req, res, next);
  }
);

router.get(
  "/cases/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    await caseController.get(req, res, next);
  }
);

router.delete(
  "/cases/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    await caseController.delete(req, res, next);
  }
);

export default router;
