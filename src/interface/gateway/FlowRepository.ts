import { PrismaClient } from "@prisma/client";
import { DeepPartial } from "../../domain/model/DeepPartial";
import { Flow } from "../../domain/model/Flow";
import { IFlowRepository } from "../../domain/repository/IFlowRepository";
import { FieldSelector } from "./FieldSelector";

export class FlowRepository implements IFlowRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save({ id, case: c, line, ...props }: Flow): Promise<Required<Flow>> {
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

  async findMany(
    props: {
      caseId: number;
      before: boolean;
    },
    fields: string[] = []
  ): Promise<DeepPartial<Flow>[]> {
    return this.prisma.flow.findMany({
      where: props,
      select: FieldSelector.toFlow(fields),
    });
  }

  async deleteMany(caseId: number): Promise<void> {
    await this.prisma.flow.deleteMany({ where: { caseId } });
  }
}
