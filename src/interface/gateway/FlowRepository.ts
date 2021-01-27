import { PrismaClient } from "@prisma/client";
import { Flow } from "../../domain/model/Flow";
import { IFlowRepository } from "../../domain/repository/IFlowRepository";
import { FieldSelector } from "./FieldSelector";

export class FlowRepository implements IFlowRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save({ id, case: c, line, ...props }: Flow): Promise<Flow> {
    return await this.prisma.flow.create({
      data: {
        ...props,
        case: {
          connect: { id: c.id },
        },
        line: {
          connect: { id: line.id },
        },
      },
      include: {
        case: { include: { feeder: true } },
        line: {
          include: {
            prevNode: { include: { feeder: true } },
            nextNode: { include: { feeder: true } },
          },
        },
      },
    });
  }

  async findMany({
    caseId,
    before,
    fields,
  }: {
    caseId: number;
    before: boolean;
    fields: string[];
  }): Promise<Partial<Flow>[]> {
    return this.prisma.flow.findMany({
      where: { caseId, before },
      select: FieldSelector.toFlow(fields),
    });
  }

  async deleteMany(caseId: number): Promise<void> {
    await this.prisma.flow.deleteMany({ where: { caseId } });
  }
}
