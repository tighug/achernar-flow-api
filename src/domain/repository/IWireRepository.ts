import { Wire } from "../model/Wire";

export interface IWireRepository {
  listByFeeder(id: number): Promise<Wire[]>;
}
