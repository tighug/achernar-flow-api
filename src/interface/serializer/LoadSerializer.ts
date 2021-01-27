import { Load } from "../../domain/model/Load";
import { CaseBaseRO } from "./CaseSerializer";
import { NodeBaseRO } from "./NodeSerializer";

export class LoadSerializer {
  static serializeArray(models: DeepPartial<Load>[]): LoadsRO {
    const loads = models.map(this.serializeSingle);
    return {
      loadCount: loads.length,
      loads,
    };
  }

  private static serializeSingle(model: DeepPartial<Load>): LoadBaseRO {
    return { ...model };
  }
}

export type LoadBaseRO = Readonly<
  Partial<{
    id: number;
    case: CaseBaseRO;
    node: NodeBaseRO;
    val: number;
    type: string;
  }>
>;

export type LoadsRO = Readonly<{
  loadCount: number;
  loads: LoadBaseRO[];
}>;
