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
    hasLoad: {
      type: "boolean",
    },
    cableType: {
      type: "text",
    },
    rOhmPerKm: {
      type: "float",
    },
    zOhmPerKm: {
      type: "float",
    },
  },
  relations: {
    feeder: {
      type: "many-to-one",
      target: "feeders",
    },
    prevJoint: {
      type: "many-to-one",
      target: "joints",
    },
    nextJoint: {
      type: "many-to-one",
      target: "joints",
    },
  },
});
