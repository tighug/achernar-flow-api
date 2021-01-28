import express from "express";
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
import { CaseSimulate } from "../usecase/case/simulate/CaseSimulate";
import { FlowService } from "../domain/service/FlowService";
import { LoadService } from "../domain/service/LoadService";
import { FlowRepository } from "../interface/gateway/FlowRepository";
import { FlowController } from "../interface/controller/FlowController";
import { FlowList } from "../usecase/flow/list/FlowList";
import { FlowDelete } from "../usecase/flow/delete/FlowDelete";
import { LoadRepository } from "../interface/gateway/LoadRepository";
import { LoadController } from "../interface/controller/LoadController";
import { LoadList } from "../usecase/load/list/LoadList";
import { LoadDelete } from "../usecase/load/delete/LoadDelete";
import WebSocket from "ws";

const router = express.Router();
const prisma = new PrismaClient();
const wss = new WebSocket.Server({ port: 9000 });

// Repository
const feederRepository = new FeederRepository(prisma);
const nodeRepository = new NodeRepository(prisma);
const lineRepository = new LineRepository(prisma);
const sampleRepository = new SampleRepository(prisma);
const caseRepository = new CaseRepository(prisma);
const flowRepository = new FlowRepository(prisma);
const loadRepository = new LoadRepository(prisma);

// Service
const loadService = new LoadService(sampleRepository, nodeRepository);
const flowService = new FlowService(lineRepository);

// Usecase
const feederList = new FeederList(feederRepository);
const nodeList = new NodeList(nodeRepository);
const lineList = new LineList(lineRepository);
const sampleList = new SampleList(sampleRepository);
const caseRegister = new CaseRegister(caseRepository, feederRepository);
const caseGet = new CaseGet(caseRepository);
const caseList = new CaseList(caseRepository);
const caseSimulate = new CaseSimulate(
  caseRepository,
  flowRepository,
  loadRepository,
  flowService,
  loadService,
  wss
);
const caseDelete = new CaseDelete(caseRepository);
const flowList = new FlowList(flowRepository);
const flowDelete = new FlowDelete(flowRepository);
const loadList = new LoadList(loadRepository);
const loadDelete = new LoadDelete(loadRepository);

// Controller
const feederController = new FeederController(feederList);
const nodeController = new NodeController(nodeList);
const lineController = new LineController(lineList);
const sampleController = new SampleController(sampleList);
const caseController = new CaseController(
  caseRegister,
  caseGet,
  caseList,
  caseSimulate,
  caseDelete
);
const flowController = new FlowController(flowList, flowDelete);
const loadController = new LoadController(loadList, loadDelete);

// Feeders
router.get("/feeders/:feederId/nodes", (req, res, next) => {
  nodeController.list(req, res, next);
});
router.get("/feeders/:feederId/lines", (req, res, next) => {
  lineController.list(req, res, next);
});
router.get("/feeders/:feederId/cases", (req, res, next) => {
  caseController.list(req, res, next);
});
router.get("/feeders", (req, res, next) => {
  feederController.list(req, res, next);
});

// Samples
router.get("/samples", (req, res, next) => {
  sampleController.list(req, res, next);
});

// Cases
router.post("/cases", (req, res, next) => {
  caseController.register(req, res, next);
});
router.get("/cases/:id", (req, res, next) => {
  caseController.get(req, res, next);
});
router.put("/cases/:id", (req, res, next) => {
  caseController.simulate(req, res, next);
});
router.delete("/cases/:id", (req, res, next) => {
  caseController.delete(req, res, next);
});
router.get("/cases/:caseId/flows", (req, res, next) => {
  flowController.list(req, res, next);
});
router.delete("/cases/:caseId/flows", (req, res, next) => {
  flowController.delete(req, res, next);
});
router.get("/cases/:caseId/loads", (req, res, next) => {
  loadController.list(req, res, next);
});
router.delete("/cases/:caseId/loads", (req, res, next) => {
  loadController.delete(req, res, next);
});

export default router;
