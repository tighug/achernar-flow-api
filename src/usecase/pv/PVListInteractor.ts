import { IPVRepository } from "../../domain/repository/IPVRepository";
import { IPVListInteractor } from "./IPVListInteractor";
import { PVListInput } from "./PVListInput";
import { PVListOutput } from "./PVListOutput";

export class PVListInteracotr implements IPVListInteractor {
  constructor(private readonly pvRepository: IPVRepository) {}

  handle(input: PVListInput): Promise<PVListOutput> {
    return this.pvRepository.listByTime(input.hour, input.minute);
  }
}
