import { CaseQueueInput } from "./CaseQueueInput";
import { CaseQueueOutput } from "./CaseQueueOutput";

export interface ICaseQueue {
  handle(props: CaseQueueInput): Promise<CaseQueueOutput>;
}
