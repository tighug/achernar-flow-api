import { PrismaClient } from "@prisma/client";
import { Sample } from "../../domain/model/Sample";
import { ISampleRepository } from "../../domain/repository/ISampleRepository";

export class SampleRepository implements ISampleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findMany(props: {
    hour: number;
    minute: number;
    season: string;
    type: string;
  }): Promise<Sample[]> {
    return this.prisma.sample.findMany({
      where: {
        hour: props.hour,
        minute: props.minute,
        season: props.season,
        type: props.type,
      },
    });
  }
}
