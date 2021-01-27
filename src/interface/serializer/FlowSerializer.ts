import { Flow } from "../../domain/model/Flow";
import { CaseBaseRO } from "./CaseSerializer";
import { LineBaseRO } from "./LineSerializer";

export class FlowSerializer {
  static serializeArray(models: DeepPartial<Flow>[]): FlowsRO {
    const flows = models.map(this.serializeSingle);
    return {
      flowCount: flows.length,
      flows,
    };
  }

  private static serializeSingle(flow: DeepPartial<Flow>): FlowBaseRO {
    return { ...flow };
  }
}

export type FlowBaseRO = Readonly<
  Partial<{
    id: number;
    case: CaseBaseRO;
    line: LineBaseRO;
    nextNodeP: number;
    nextNodeV: number;
    lineI: number;
    before: boolean;
  }>
>;

export type FlowsRO = Readonly<{
  flowCount: number;
  flows: FlowBaseRO[];
}>;
