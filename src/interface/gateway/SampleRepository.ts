import { PrismaClient } from "@prisma/client";
import { Sample } from "../../domain/model/Sample";
import { ISampleRepository } from "../../domain/repository/ISampleRepository";

export class SampleRepository implements ISampleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findLoadsByTime(
    hour: number,
    minute: number,
    season: string
  ): Promise<Sample[]> {
    return this.prisma.loadSample.findMany({ where: { hour, minute, season } });
  }

  async findPVsByTime(
    hour: number,
    minute: number,
    season: string
  ): Promise<Sample[]> {
    return this.prisma.pVSample.findMany({ where: { hour, minute, season } });
  }

  async findEHPsByTime(
    hour: number,
    minute: number,
    season: string
  ): Promise<Sample[]> {
    return this.prisma.eHPSample.findMany({ where: { hour, minute, season } });
  }

  async findUCHPsByTime(
    hour: number,
    minute: number,
    season: string
  ): Promise<Sample[]> {
    return this.prisma.uCHPSample.findMany({ where: { hour, minute, season } });
  }
}
