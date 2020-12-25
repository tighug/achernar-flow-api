import { EntitySchema } from "typeorm";
import { Feeder } from "../../../domain/model/Feeder";

export const FeederEntity = new EntitySchema<Feeder>({
  name: "feeder",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    networkNum: {
      type: "int",
    },
    feederNum: {
      type: "int",
    },
    jointCount: {
      type: "int",
    },
    houseCount: {
      type: "int",
    },
  },
});
