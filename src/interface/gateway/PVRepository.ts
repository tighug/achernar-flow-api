import { PrismaClient } from "@prisma/client";
import { PV } from "../../domain/model/PV";
import { IPVRepository } from "../../domain/repository/IPVRepository";

export class PVRepository implements IPVRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async listByTime(hour: number, minute: number): Promise<PV[]> {
    return this.prisma.pV.findMany({
      where: { hour, minute, season: "summer" },
    });
  }
}
