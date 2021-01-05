export class Load {
  readonly id: number;
  readonly num: number;
  readonly hour: number;
  readonly minute: number;
  readonly val: number;
  readonly season: string;

  constructor(props: LoadProps) {
    this.id = props.id;
    this.num = props.num;
    this.hour = props.hour;
    this.minute = props.minute;
    this.val = props.val;
    this.season = props.season;
  }
}

type LoadProps = Required<Load>;
