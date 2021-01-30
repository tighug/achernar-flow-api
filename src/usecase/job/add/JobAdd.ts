import createHttpError from "http-errors";
import { ICaseRepository } from "../../../domain/repository/ICaseRepository";
import { IJobRepository } from "../../../domain/repository/IJobRepository";
import { IJobAdd } from "./IJobAdd";
import { JobAddInput } from "./JobAddInput";
import { JobAddOutput } from "./JobAddOutput";

export class JobAdd implements IJobAdd {
  constructor(
    private readonly jobRepository: IJobRepository,
    private readonly caseRepository: ICaseRepository
  ) {}

  async handle({ caseId }: JobAddInput): Promise<JobAddOutput> {
    const c = await this.caseRepository.findOne(caseId);

    if (c === null)
      throw new createHttpError.NotFound("This case is not found.");
    if (c.status !== "waiting")
      throw new createHttpError.Conflict(
        "This case has already been simulated."
      );

    return this.jobRepository.add(caseId);
  }
}
