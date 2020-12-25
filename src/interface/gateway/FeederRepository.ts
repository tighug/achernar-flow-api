import { Connection, Repository } from "typeorm";
import { Feeder } from "../../domain/model/Feeder";
import { IFeederRepository } from "../../domain/repository/IFeederRepository";
import { FeederEntity } from "./entity/FeederEntity";

export class FeederRepository implements IFeederRepository {
  private readonly repository: Repository<Feeder>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository<Feeder>(FeederEntity);
  }

  findAll(): Promise<Feeder[]> {
    return this.repository.find();
  }

  find(id: number): Promise<Feeder | undefined> {
    return this.repository.findOne(id);
  }
}
