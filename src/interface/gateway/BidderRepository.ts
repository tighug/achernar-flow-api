import { PrismaClient } from "@prisma/client";
import { Bidder } from "../../domain/model/Bidder";
import { DeepPartial } from "../../domain/model/DeepPartial";
import { IBidderRepository } from "../../domain/repository/IBidderRepository";
import { FieldSelector } from "./FieldSelector";

export class BidderRepository implements IBidderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save({ id, bidCase, node, ...props }: Bidder): Promise<Required<Bidder>> {
    return this.prisma.bidder.create({
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
    props: { bidCaseId: number; type?: string },
    fields: string[] = []
  ): Promise<DeepPartial<Bidder>[]> {
    return this.prisma.bidder.findMany({
      where: props,
      select: FieldSelector.toBidder(fields),
    });
  }
}
