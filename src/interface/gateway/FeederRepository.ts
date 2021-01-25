import { PrismaClient } from "@prisma/client";
import { Feeder } from "../../domain/model/Feeder";
import { IFeederRepository } from "../../domain/repository/IFeederRepository";
import { FieldSelector } from "./FieldSelector";

export class FeederRepository implements IFeederRepository {
  constructor(private prisma: PrismaClient) {}
  findOne({
    id,
    fields,
  }: {
    id: number;
    fields: string[];
  }): Promise<Partial<Feeder> | null> {
    return this.prisma.feeder.findUnique({
      where: { id },
      select: FieldSelector.toFeeder(fields),
    });
  }

  findAll({ fields }: { fields: string[] }): Promise<Partial<Feeder>[]> {
    return this.prisma.feeder.findMany({
      select: FieldSelector.toFeeder(fields),
    });
  }
}
