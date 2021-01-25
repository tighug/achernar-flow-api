import { PrismaClient } from "@prisma/client";
import { Sample } from "../../domain/model/Sample";
import { ISampleRepository } from "../../domain/repository/ISampleRepository";
import { FieldSelector } from "./FieldSelector";

export class SampleRepository implements ISampleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findMany({
    fields,
    ...queries
  }: {
    hour: number;
    minute: number;
    season: string;
    type: string;
    fields: string[];
  }): Promise<Sample[]> {
    return this.prisma.sample.findMany({
      where: queries,
      select: FieldSelector.toSample(fields),
    });
  }
}
