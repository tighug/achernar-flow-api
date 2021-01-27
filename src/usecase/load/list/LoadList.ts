import { ILoadRepository } from "../../../domain/repository/ILoadRepository";
import { ILoadList } from "./ILoadList";
import { LoadListInput } from "./LoadListInput";
import { LoadListOutput } from "./LoadListOutput";

export class LoadList implements ILoadList {
  constructor(private readonly loadRepository: ILoadRepository) {}

  handle({ fields, ...props }: LoadListInput): Promise<LoadListOutput> {
    return this.loadRepository.findMany(props, fields);
  }
}
