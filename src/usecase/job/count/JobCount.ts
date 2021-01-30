import { IJobRepository } from "../../../domain/repository/IJobRepository";
import { IJobCount } from "./IJobCount";
import { JobCountOutput } from "./JobCountOutput";

export class JobCount implements IJobCount {
  constructor(private readonly jobRepository: IJobRepository) {}

  handle(): Promise<JobCountOutput> {
    return this.jobRepository.count();
  }
}
