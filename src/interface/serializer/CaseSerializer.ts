import { Case } from "../../domain/model/Case";
import { FeederBaseRO } from "./FeederSerializer";

export class CaseSerializer {
  static serialize(model: Partial<Case>): CaseRO {
    return { case: this.serializeSingle(model) };
  }

  static serializeArray(models: Partial<Case>[]): CasesRO {
    const cases = models.map(this.serializeSingle);
    return {
      caseCount: cases.length,
      cases,
    };
  }

  private static serializeSingle(model: Partial<Case>): CaseBaseRO {
    return { ...model };
  }
}

export type CaseBaseRO = Readonly<
  Partial<{
    id: number;
    feeder: FeederBaseRO;
    hour: number;
    minute: number;
    pvCount: number;
    pvScale: number;
    loadScale: number;
    seed: number;
  }>
>;

export type CaseRO = Readonly<{
  case: CaseBaseRO;
}>;

export type CasesRO = Readonly<{
  caseCount: number;
  cases: CaseBaseRO[];
}>;
