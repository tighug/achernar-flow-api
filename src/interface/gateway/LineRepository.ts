import { PrismaClient } from "@prisma/client";
import { Line } from "../../domain/model/Line";
import { ILineRepository } from "../../domain/repository/ILineRepository";
import { FieldSelector } from "./FieldSelector";

export class LineRepository implements ILineRepository {
  constructor(private prisma: PrismaClient) {}

  findMany({
    feederId,
    fields,
  }: {
    feederId: number;
    fields: string[];
  }): Promise<Partial<Line>[]> {
    return this.prisma.line.findMany({
      where: {
        prevNode: { feederId },
      },
      select: FieldSelector.toLine(fields),
    });
  }
}
