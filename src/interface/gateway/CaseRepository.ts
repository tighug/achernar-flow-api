import { PrismaClient } from "@prisma/client";
import { Case } from "../../domain/model/Case";
import { ICaseRepository } from "../../domain/repository/ICaseRepository";
import { FieldSelector } from "./FieldSelector";

export class CaseRepository implements ICaseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(c: Case): Promise<Required<Case>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, feeder, ...props } = c;
    if (feeder === undefined) throw new Error("feeder is undefined.");
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

  async findOne({
    id,
    fields,
  }: {
    id: number;
    fields: string[];
  }): Promise<Partial<Case> | null> {
    return await this.prisma.case.findUnique({
      where: { id },
      select: FieldSelector.toCase(fields),
    });
  }

  async findMany({
    feederId,
    fields,
  }: {
    feederId: number;
    fields: string[];
  }): Promise<Partial<Case>[]> {
    return await this.prisma.case.findMany({
      where: { feederId },
      select: FieldSelector.toCase(fields),
    });
  }

  async update({ id, status }: { id: number; status: string }): Promise<Case> {
    return this.prisma.case.update({ where: { id }, data: { status } });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.case.delete({ where: { id } });
  }
}
