import { PrismaClient } from "@prisma/client";
import { Node } from "../../domain/model/Node";
import { INodeRepository } from "../../domain/repository/INodeRepository";

export class NodeRepository implements INodeRepository {
  constructor(private prisma: PrismaClient) {}

  listByFeederId(feederId: number): Promise<Node[]> {
    return this.prisma.node.findMany({
      where: { feederId },
      include: { feeder: true },
    });
  }
}
