import { PrismaClient } from "@prisma/client";
import { Feeder } from "../../domain/model/Feeder";
import { IFeederRepository } from "../../domain/repository/IFeederRepository";

export class FeederRepository implements IFeederRepository {
  constructor(private prisma: PrismaClient) {}

  findAll(): Promise<Feeder[]> {
    return this.prisma.feeder.findMany();
  }
}
