import { EntitySchema } from "typeorm";
import { Joint } from "../../../domain/model/Joint";

export const JointEntity = new EntitySchema<Joint>({
  name: "joints",
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
      type: "float",
    },
    posY: {
      type: "float",
    },
  },
  relations: {
    feeder: {
      type: "many-to-one",
      target: "feeders",
    },
  },
});
