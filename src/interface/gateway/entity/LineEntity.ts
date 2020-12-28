import { EntitySchema } from "typeorm";
import { Line } from "../../../domain/model/Line";

export const LineEntity = new EntitySchema<Line>({
  name: "lines",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    lengthM: {
      type: "float",
    },
    code: {
      type: "text",
    },
    rOhmPerKm: {
      type: "float",
    },
    xOhmPerKm: {
      type: "float",
    },
  },
  relations: {
    feeder: {
      type: "many-to-one",
      target: "feeders",
    },
    prevNode: {
      type: "many-to-one",
      target: "nodes",
    },
    nextNode: {
      type: "many-to-one",
      target: "nodes",
    },
  },
});
