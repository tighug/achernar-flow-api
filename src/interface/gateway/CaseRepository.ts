import { PrismaClient } from "@prisma/client";
import { Case } from "../../domain/model/Case";
import { ICaseRepository } from "../../domain/repository/ICaseRepository";
import { FieldSelector } from "./FieldSelector";

export class CaseRepository implements ICaseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(c: Case): Promise<Required<Case>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, feeder, ...props } = c;
    return await this.prisma.case.create({
      data: {
        ...props,
        feeder: {
          connect: { id: feeder.id },
        },
      },
      include: { feeder: true },
    });
  }

  async findOne(
    id: number,
    fields: string[] = []
  ): Promise<Partial<Case> | null> {
    return await this.prisma.case.findUnique({
      where: { id },
      select: FieldSelector.toCase(fields),
    });
  }

  async findMany(
    feederId: number,
    fields: string[] = []
  ): Promise<Partial<Case>[]> {
    return await this.prisma.case.findMany({
      where: { feederId },
      select: FieldSelector.toCase(fields),
    });
  }

  async update(id: number, status: string): Promise<Required<Case>> {
    return this.prisma.case.update({
      where: { id },
      data: { status },
      include: { feeder: true },
    });
  }

  async delete(id: number): Promise<void> {
    const deleteLoads = this.prisma.load.deleteMany({
      where: { caseId: id },
    });
    const deleteFlows = this.prisma.flow.deleteMany({
      where: { caseId: id },
    });
    const deleteBidCases = this.prisma.bidCase.deleteMany({
      where: { caseId: id },
    });
    const deleteCase = this.prisma.case.delete({ where: { id } });
    await this.prisma.$transaction([
      deleteLoads,
      deleteFlows,
      deleteBidCases,
      deleteCase,
    ]);
  }
}
