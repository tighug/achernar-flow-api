import { Feeder } from "./Feeder";

export class Case {
  id?: number;
  readonly feeder: Feeder;
  readonly hour: number;
  readonly minute: number;
  readonly pvCount: number;
  readonly pvScale: number;
  readonly loadScale: number;
  readonly baseV: number;
  readonly seed: number;
  status = "waiting";

  constructor(props: Omit<Case, "id" | "status">) {
    this.feeder = props.feeder;
    this.hour = props.hour;
    this.minute = props.minute;
    this.pvCount = props.pvCount;
    this.pvScale = props.pvScale;
    this.loadScale = props.loadScale;
    this.baseV = props.baseV;
    this.seed = props.seed;
  }
}
