import { ILineRepository } from "../../../domain/repository/ILineRepository";
import { ILineListInteractor } from "./ILineListInteractor";
import { LineListOutputData } from "./LineListOutputData";

export class LineListInteractor implements ILineListInteractor {
  constructor(private readonly lineRepository: ILineRepository) {}

  async handle(feederId: number): Promise<LineListOutputData> {
    return this.lineRepository.listByFeeder(feederId);
  }
}
