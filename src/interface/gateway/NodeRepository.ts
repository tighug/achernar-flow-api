import { PrismaClient } from "@prisma/client";
import { Node } from "../../domain/model/Node";
import { INodeRepository } from "../../domain/repository/INodeRepository";

export class NodeRepository implements INodeRepository {
  constructor(private prisma: PrismaClient) {}

  findMany(props: {
    feederId: number;
    fields: string[];
  }): Promise<Partial<Node>[]> {
    const { feederId, fields } = props;
    const feeder = fields.includes("feeder");
    const num = fields.includes("num");
    const posX = fields.includes("posX");
    const posY = fields.includes("posY");
    const hasLoad = fields.includes("hasLoad");

    return this.prisma.node.findMany({
      where: { feederId },
      select: { num, posX, posY, hasLoad, feeder },
    });
  }
}
