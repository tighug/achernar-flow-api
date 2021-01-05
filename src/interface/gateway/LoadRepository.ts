import { PrismaClient } from "@prisma/client";
import { Load } from "../../domain/model/Load";
import { ILoadRepository } from "../../domain/repository/ILoadRepository";

export class LoadRepository implements ILoadRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async listByTime(
    hour: number,
    minute: number,
    season: string
  ): Promise<Load[]> {
    return this.prisma.load.findMany({ where: { hour, minute, season } });
  }
}
