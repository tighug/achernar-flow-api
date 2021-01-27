import { PrismaClient } from "@prisma/client";
import { Load } from "../../domain/model/Load";
import { ILoadRepository } from "../../domain/repository/ILoadRepository";
import { FieldSelector } from "./FieldSelector";

export class LoadRepository implements ILoadRepository {
  constructor(private readonly prisma: PrismaClient) {}

  save(load: Load): Promise<Required<Load>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, case: c, node, ...props } = load;
    return this.prisma.load.create({
      data: {
        ...props,
        case: {
          connect: { id: c.id },
        },
        node: {
          connect: { id: node.id },
        },
      },
      include: {
        case: { include: { feeder: true } },
        node: { include: { feeder: true } },
      },
    });
  }

  findMany(
    props: { caseId: number; type: string },
    fields: string[] = []
  ): Promise<DeepPartial<Load>[]> {
    return this.prisma.load.findMany({
      where: props,
      select: FieldSelector.toLoad(fields),
    });
  }

  async deleteMany(caseId: number): Promise<void> {
    await this.prisma.load.deleteMany({ where: { caseId } });
  }
}
