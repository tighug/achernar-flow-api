import { PrismaClient } from "@prisma/client";
import { Line } from "../../domain/model/Line";
import { ILineRepository } from "../../domain/repository/ILineRepository";

export class LineRepository implements ILineRepository {
  constructor(private prisma: PrismaClient) {}

  listByFeederId(feederId: number): Promise<Line[]> {
    return this.prisma.line.findMany({
      where: {
        feederId,
      },
      include: {
        feeder: true,
        prevNode: { include: { feeder: true } },
        nextNode: { include: { feeder: true } },
      },
    });
  }
}
