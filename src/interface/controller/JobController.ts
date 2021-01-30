import { NextFunction, Request, Response } from "express";
import { IJobAdd } from "../../usecase/job/add/IJobAdd";
import { IJobCount } from "../../usecase/job/count/IJobCount";
import { Sanitizer } from "./Sanitizer";

export class JobController {
  constructor(
    private readonly jobAdd: IJobAdd,
    private readonly jobCount: IJobCount
  ) {}

  async add(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { caseId } = req.params;
      const input = {
        caseId: Sanitizer.toCaseId(caseId),
      };

      const job = await this.jobAdd.handle(input);

      res.json(job.toJSON());
    } catch (err) {
      next(err);
    }
  }

  async count(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const jobCounts = await this.jobCount.handle();

      res.json(jobCounts);
    } catch (err) {
      next(err);
    }
  }
}
