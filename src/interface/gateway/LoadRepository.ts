import { PrismaClient } from "@prisma/client";
import { Load } from "../../domain/model/Load";
import { ILoadRepository } from "../../domain/repository/ILoadRepository";

export class LoadRepository implements ILoadRepository {
  constructor(private readonly prisma: PrismaClient) {}

  save(load: Load): Promise<Load> {
    throw new Error("Method not implemented.");
  }

  findMany(props: {
    caseId: number;
    type: string;
    fields: string[];
  }): Promise<Partial<Load>[]> {
    throw new Error("Method not implemented.");
  }
}
