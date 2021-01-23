import { PrismaClient } from "@prisma/client";
import { Node } from "../../domain/model/Node";
import { INodeRepository } from "../../domain/repository/INodeRepository";

export class NodeRepository implements INodeRepository {
  constructor(private prisma: PrismaClient) {}

  findMany(props: { feederId: number }): Promise<Node[]> {
    return this.prisma.node.findMany({
      where: { feederId: props.feederId },
      include: { feeder: true },
    });
  }
}
