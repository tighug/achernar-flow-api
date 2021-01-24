import { PrismaClient } from "@prisma/client";
import { Node } from "../../domain/model/Node";
import { INodeRepository } from "../../domain/repository/INodeRepository";
import { FieldSelector } from "./FieldSelector";

export class NodeRepository implements INodeRepository {
  constructor(private prisma: PrismaClient) {}

  findMany(props: {
    feederId: number;
    fields: string[];
  }): Promise<Partial<Node>[]> {
    const { feederId, fields } = props;

    return this.prisma.node.findMany({
      where: { feederId },
      select: FieldSelector.toNode(fields),
    });
  }
}
