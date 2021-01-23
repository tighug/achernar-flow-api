import { ILineRepository } from "../../../domain/repository/ILineRepository";
import { ILineList } from "./ILineList";
import { LineListInput } from "./LineListInput";
import { LineListOutput } from "./LineListOutput";

export class LineList implements ILineList {
  constructor(private readonly lineRepository: ILineRepository) {}

  handle(props: LineListInput): Promise<LineListOutput> {
    return this.lineRepository.findMany(props);
  }
}
