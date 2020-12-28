import { Connection, Repository } from "typeorm";
import { Node } from "../../domain/model/Node";
import { INodeRepository } from "../../domain/repository/INodeRepository";
import { NodeEntity } from "./entity/NodeEntity";

export class NodeRepository implements INodeRepository {
  private readonly repository: Repository<Node>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository<Node>(NodeEntity);
  }

  listByFeederId(feederId: number): Promise<Node[]> {
    return this.repository.find({ feeder: { id: feederId } });
  }
}
