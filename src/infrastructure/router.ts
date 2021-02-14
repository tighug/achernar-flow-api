import { Router } from "express";
import { FeederRepository } from "../interface/gateway/FeederRepository";
import { NodeRepository } from "../interface/gateway/NodeRepository";
import { LineRepository } from "../interface/gateway/LineRepository";
import { FeederList } from "../usecase/feeder/list/FeederList";
import { NodeList } from "../usecase/node/list/NodeList";
import { LineList } from "../usecase/line/list/LineList";
import { SampleRepository } from "../interface/gateway/SampleRepository";
import { SampleList } from "../usecase/sample/list/SampleList";
import { CaseRepository } from "../interface/gateway/CaseRepository";
import { CaseRegister } from "../usecase/case/register/CaseRegister";
import { CaseGet } from "../usecase/case/get/CaseGet";
import { CaseList } from "../usecase/case/list/CaseList";
import { CaseDelete } from "../usecase/case/delete/CaseDelete";
import { FlowService } from "../domain/service/FlowService";
import { LoadService } from "../domain/service/LoadService";
import { FlowRepository } from "../interface/gateway/FlowRepository";
import { FlowList } from "../usecase/flow/list/FlowList";
import { FlowDelete } from "../usecase/flow/delete/FlowDelete";
import { LoadRepository } from "../interface/gateway/LoadRepository";
import { LoadList } from "../usecase/load/list/LoadList";
import { LoadDelete } from "../usecase/load/delete/LoadDelete";
import { JobRepository } from "../interface/gateway/JobRepository";
import { FeederController } from "../interface/controller/FeederController";
import { NodeController } from "../interface/controller/NodeController";
import { LineController } from "../interface/controller/LineController";
import { SampleController } from "../interface/controller/SampleController";
import { CaseController } from "../interface/controller/CaseController";
import { FlowController } from "../interface/controller/FlowController";
import { LoadController } from "../interface/controller/LoadController";
import { PrismaClient } from "@prisma/client";
import { Queue } from "bull";
import { Server } from "ws";
import { BidCaseRepository } from "../interface/gateway/BidCaseRepository";
import { BidCaseRegister } from "../usecase/bidCase/register/BidCaseRegister";
import { BidCaseGet } from "../usecase/bidCase/get/BidCaseGet";
import { BidCaseList } from "../usecase/bidCase/list/BidCaseList";
import { BidCaseDelete } from "../usecase/bidCase/delete/BidCaseDelete";
import { BidCaseController } from "../interface/controller/BidCaseController";
import { BidderRepository } from "../interface/gateway/BidderRepository";
import { BidderList } from "../usecase/bidder/list/BidderList";
import { BidderController } from "../interface/controller/BidderController";
import { CaseQueue } from "../usecase/case/queue/CaseQueue";

export const router = (
  prisma: PrismaClient,
  caseQueue: Queue,
  bidCaseQueue: Queue,
  wss: Server
): Router => {
  // Repository
  const feederRepository = new FeederRepository(prisma);
  const nodeRepository = new NodeRepository(prisma);
  const lineRepository = new LineRepository(prisma);
  const sampleRepository = new SampleRepository(prisma);
  const caseRepository = new CaseRepository(prisma);
  const flowRepository = new FlowRepository(prisma);
  const loadRepository = new LoadRepository(prisma);
  const bidCaseRepository = new BidCaseRepository(prisma);
  const bidderRepository = new BidderRepository(prisma);
  const jobRepository = new JobRepository(caseQueue, bidCaseQueue, wss);

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
  const caseDelete = new CaseDelete(caseRepository);
  const caseAddQueue = new CaseQueue(
    caseRepository,
    jobRepository,
    loadService,
    flowService,
    flowRepository,
    loadRepository
  );
  const flowList = new FlowList(flowRepository);
  const flowDelete = new FlowDelete(flowRepository);
  const loadList = new LoadList(loadRepository);
  const loadDelete = new LoadDelete(loadRepository);
  const bidCaseRegister = new BidCaseRegister(
    bidCaseRepository,
    caseRepository
  );
  const bidCaseGet = new BidCaseGet(bidCaseRepository);
  const bidCaseList = new BidCaseList(bidCaseRepository);
  const bidCaseDelete = new BidCaseDelete(bidCaseRepository);
  const bidderList = new BidderList(bidderRepository);
  const feeder = new FeederController(feederList);
  const node = new NodeController(nodeList);
  const line = new LineController(lineList);
  const sample = new SampleController(sampleList);
  const c = new CaseController(
    caseRegister,
    caseGet,
    caseList,
    caseDelete,
    caseAddQueue
  );
  const flow = new FlowController(flowList, flowDelete);
  const load = new LoadController(loadList, loadDelete);
  const bidCase = new BidCaseController(
    bidCaseRegister,
    bidCaseGet,
    bidCaseList,
    bidCaseDelete
  );
  const bidder = new BidderController(bidderList);

  return (
    Router()
      // Feeders
      .get("/feeders/:feederId/nodes", (req, res, next) => {
        node.list(req, res, next);
      })
      .get("/feeders/:feederId/lines", (req, res, next) => {
        line.list(req, res, next);
      })
      .get("/feeders/:feederId/cases", (req, res, next) => {
        c.list(req, res, next);
      })
      .get("/feeders", (req, res, next) => {
        feeder.list(req, res, next);
      })
      // Samples
      .get("/samples", (req, res, next) => {
        sample.list(req, res, next);
      })
      // Cases
      .post("/cases", (req, res, next) => {
        c.register(req, res, next);
      })
      .get("/cases/:id", (req, res, next) => {
        c.get(req, res, next);
      })
      .delete("/cases/:id", (req, res, next) => {
        c.delete(req, res, next);
      })
      .get("/cases/:caseId/flows", (req, res, next) => {
        flow.list(req, res, next);
      })
      .delete("/cases/:caseId/flows", (req, res, next) => {
        flow.delete(req, res, next);
      })
      .get("/cases/:caseId/loads", (req, res, next) => {
        load.list(req, res, next);
      })
      .delete("/cases/:caseId/loads", (req, res, next) => {
        load.delete(req, res, next);
      })
      .post("/cases/:id/queue", (req, res, next) => {
        c.queue(req, res, next);
      })
      .get("/cases/:caseId/bidCases", (req, res, next) => {
        bidCase.list(req, res, next);
      })
      .get("/bidCases/:id", (req, res, next) => {
        bidCase.list(req, res, next);
      })
      .post("/bidCases", (req, res, next) => {
        bidCase.register(req, res, next);
      })
      .delete("/bidCases/:id", (req, res, next) => {
        bidCase.delete(req, res, next);
      })
      .get("/bidCases/:bidCaseId/bidders", (req, res, next) => {
        bidder.list(req, res, next);
      })
  );
};
