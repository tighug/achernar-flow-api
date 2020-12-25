import { EntitySchema } from "typeorm";
import { Joint } from "../../../domain/model/Joint";

export const JointEntity = new EntitySchema<Joint>({
  name: "joint",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    num: {
      type: "int",
    },
    posX: {
      type: Number,
    },
    posY: {
      type: Number,
    },
  },
  relations: {
    feeder: {
      type: "many-to-one",
      target: "feeder",
    },
  },
});
