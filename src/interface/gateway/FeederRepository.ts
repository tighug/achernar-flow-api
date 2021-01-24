import { PrismaClient } from "@prisma/client";
import { Feeder } from "../../domain/model/Feeder";
import { IFeederRepository } from "../../domain/repository/IFeederRepository";
import { FieldSelector } from "./FieldSelector";

export class FeederRepository implements IFeederRepository {
  constructor(private prisma: PrismaClient) {}

  findAll(props: { fields: string[] }): Promise<Partial<Feeder>[]> {
    const { fields } = props;
    return this.prisma.feeder.findMany({
      select: FieldSelector.toFeeder(fields),
    });
  }
}
