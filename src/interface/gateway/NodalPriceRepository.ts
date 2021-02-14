import { PrismaClient } from "@prisma/client";
import { DeepPartial } from "../../domain/model/DeepPartial";
import { NodalPrice } from "../../domain/model/NodalPrice";
import { INodalPriceRepository } from "../../domain/repository/INodalPriceRepository";
import { FieldSelector } from "./FieldSelector";

export class NodalPriceRepository implements INodalPriceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  save({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id,
    bidCase,
    node,
    ...props
  }: NodalPrice): Promise<Required<NodalPrice>> {
    return this.prisma.nodalPrice.create({
      data: {
        ...props,
        bidCase: {
          connect: { id: bidCase.id },
        },
        node: {
          connect: { id: node.id },
        },
      },
      include: {
        bidCase: { include: { case: { include: { feeder: true } } } },
        node: { include: { feeder: true } },
      },
    });
  }

  findMany(
    props: { bidCaseId: number },
    fields: string[] = []
  ): Promise<DeepPartial<NodalPrice>[]> {
    return this.prisma.nodalPrice.findMany({
      where: props,
      select: FieldSelector.toNodalPrice(fields),
    });
  }
}
