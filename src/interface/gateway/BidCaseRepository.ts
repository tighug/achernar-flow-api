import { PrismaClient } from "@prisma/client";
import { BidCase } from "../../domain/model/BidCase";
import { DeepPartial } from "../../domain/model/DeepPartial";
import { IBidCaseRepository } from "../../domain/repository/IBidCaseRepository";
import { FieldSelector } from "./FieldSelector";

export class BidCaseRepository implements IBidCaseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async save({ id, case: c, ...props }: BidCase): Promise<Required<BidCase>> {
    return await this.prisma.bidCase.create({
      data: {
        ...props,
        case: {
          connect: { id: c.id },
        },
      },
      include: {
        case: {
          include: { feeder: true },
        },
      },
    });
  }

  async findOne(
    id: number,
    fields: string[] = []
  ): Promise<DeepPartial<BidCase> | null> {
    return await this.prisma.bidCase.findUnique({
      where: { id },
      select: FieldSelector.toBidCase(fields),
    });
  }

  async findMany(
    caseId: number,
    fields: string[] = []
  ): Promise<DeepPartial<BidCase>[]> {
    return await this.prisma.bidCase.findMany({
      where: { caseId },
      select: FieldSelector.toBidCase(fields),
    });
  }

  async update(id: number, status: string): Promise<Required<BidCase>> {
    return this.prisma.bidCase.update({
      where: { id },
      data: { status },
      include: { case: { include: { feeder: true } } },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.bidCase.deleteMany({ where: { id } });
  }
}
