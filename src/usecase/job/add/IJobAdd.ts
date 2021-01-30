import { JobAddInput } from "./JobAddInput";
import { JobAddOutput } from "./JobAddOutput";

export interface IJobAdd {
  handle(props: JobAddInput): Promise<JobAddOutput>;
}
