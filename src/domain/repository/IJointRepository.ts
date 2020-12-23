import { Joint } from "../model/Joint";

export interface IJointRepository {
  listByFeeder(id: number): Promise<Joint[]>;
}
