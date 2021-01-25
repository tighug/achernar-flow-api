import { Feeder } from "./Feeder";

export class Case {
  id?: number;
  feeder: Feeder;
  hour: number;
  minute: number;
  pvCount: number;
  pvScale: number;
  loadScale: number;
  seed: number;

  constructor(props: Omit<Case, "id">) {
    this.feeder = props.feeder;
    this.hour = props.hour;
    this.minute = props.minute;
    this.pvCount = props.pvCount;
    this.pvScale = props.pvScale;
    this.loadScale = props.loadScale;
    this.seed = props.seed;
  }
}
