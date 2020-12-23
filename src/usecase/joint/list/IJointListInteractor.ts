import { JointListOutputData } from "./JointListOutputData";

export interface IJointListInteractor {
  handle(feederId: number): Promise<JointListOutputData>;
}
