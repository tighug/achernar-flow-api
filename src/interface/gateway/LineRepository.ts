import { Connection, Repository } from "typeorm";
import { Line } from "../../domain/model/Line";
import { ILineRepository } from "../../domain/repository/ILineRepository";
import { LineEntity } from "./entity/LineEntity";

export class LineRepository implements ILineRepository {
  private readonly repository: Repository<Line>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository<Line>(LineEntity);
  }

  listByFeederId(feederId: number): Promise<Line[]> {
    return this.repository.find({ feeder: { id: feederId } });
  }
}
