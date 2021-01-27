import { PrismaClient } from "@prisma/client";
import { Node } from "../../domain/model/Node";
import { INodeRepository } from "../../domain/repository/INodeRepository";
import { FieldSelector } from "./FieldSelector";

export class NodeRepository implements INodeRepository {
  constructor(private prisma: PrismaClient) {}

  findMany(feederId: number, fields: string[] = []): Promise<Partial<Node>[]> {
    return this.prisma.node.findMany({
      where: { feederId },
      select: FieldSelector.toNode(fields),
    });
  }
}
