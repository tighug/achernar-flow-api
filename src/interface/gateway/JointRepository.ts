import { Connection, Repository } from "typeorm";
import { Feeder } from "../../domain/model/Feeder";
import { Joint } from "../../domain/model/Joint";
import { IJointRepository } from "../../domain/repository/IJointRepository";
import { JointEntity } from "./entity/JointEntity";

export class JointRepository implements IJointRepository {
  private readonly repository: Repository<Joint>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository<Joint>(JointEntity);
  }

  listByFeederId(feederId: number): Promise<Joint[]> {
    return this.repository.find({ feeder: { id: feederId } });
  }
}
