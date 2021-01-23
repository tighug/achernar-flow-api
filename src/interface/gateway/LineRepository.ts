import { PrismaClient } from "@prisma/client";
import { Line } from "../../domain/model/Line";
import { ILineRepository } from "../../domain/repository/ILineRepository";

export class LineRepository implements ILineRepository {
  constructor(private prisma: PrismaClient) {}

  findMany(props: {
    feederId: number;
    fields: string[];
  }): Promise<Partial<Line>[]> {
    const { feederId, fields } = props;
    const feeder = fields.includes("feeder");
    const lengthM = fields.includes("lengthM");
    const phase = fields.includes("phase");
    const code = fields.includes("code");
    const rOhmPerKm = fields.includes("rOhmPerKm");
    const xOhmPerKm = fields.includes("xOhmPerKm");

    return this.prisma.line.findMany({
      where: {
        prevNode: { feederId },
      },
      select: {
        nextNode: {
          include: {
            feeder,
          },
        },
        prevNode: {
          include: {
            feeder,
          },
        },
        lengthM,
        phase,
        code,
        rOhmPerKm,
        xOhmPerKm,
      },
    });
  }
}
