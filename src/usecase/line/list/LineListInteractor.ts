import { ILineRepository } from "../../../domain/repository/ILineRepository";
import { ILineListInteractor } from "./ILineListInteractor";
import { LineListInput } from "./LineListInput";
import { LineListOutput } from "./LineListOutput";

export class LineListInteractor implements ILineListInteractor {
  constructor(private readonly lineRepository: ILineRepository) {}

  async handle(input: LineListInput): Promise<LineListOutput> {
    return this.lineRepository.listByFeederId(input.feederId);
  }
}
