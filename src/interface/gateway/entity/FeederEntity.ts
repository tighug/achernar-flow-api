import { EntitySchema } from "typeorm";
import { Feeder } from "../../../domain/model/Feeder";

export const FeederEntity = new EntitySchema<Feeder>({
  name: "feeders",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    networkNum: {
      type: "int",
    },
    feederNum: {
      type: "int",
    },
  },
});
