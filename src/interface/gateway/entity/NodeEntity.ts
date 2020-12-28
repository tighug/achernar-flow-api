import { EntitySchema } from "typeorm";
import { Node } from "../../../domain/model/Node";

export const NodeEntity = new EntitySchema<Node>({
  name: "nodes",
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
