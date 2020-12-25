import { EntitySchema } from "typeorm";
import { Line } from "../../../domain/model/Line";

export const LineEntity = new EntitySchema<Line>({
  name: "line",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    lengthM: {
      type: Number,
    },
    hasLoad: {
      type: Boolean,
    },
    cableType: {
      type: String,
    },
    rOhmPerKm: {
      type: Number,
    },
    zOhmPerKm: {
      type: Number,
    },
  },
  relations: {
    feeder: {
      type: "many-to-one",
      target: "feeder",
    },
    prevJoint: {
      type: "many-to-one",
      target: "joint",
    },
    nextJoint: {
      type: "many-to-one",
      target: "joint",
    },
  },
});
