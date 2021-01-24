export class FieldSelector {
  static toFeeder(fields: string[]): FeederSelect {
    const id = fields.includes("id");
    const networkNum = fields.includes("networkNum");
    const feederNum = fields.includes("feederNum");

    return { id, networkNum, feederNum };
  }

  static toNode(fields: string[]): NodeSelect {
    const id = fields.includes("id");
    const feeder = fields.includes("feeder");
    const num = fields.includes("num");
    const posX = fields.includes("posX");
    const posY = fields.includes("posY");
    const hasLoad = fields.includes("hasLoad");

    return {
      id,
      feeder: feeder ?? { select: this.toFeeder(fields) },
      num,
      posX,
      posY,
      hasLoad,
    };
  }

  static toLine(fields: string[]): LineSelect {
    const id = fields.includes("id");
    const prevNode = fields.includes("prevNode");
    const nextNode = fields.includes("nextNode");
    const lengthM = fields.includes("lengthM");
    const phase = fields.includes("phase");
    const code = fields.includes("code");
    const rOhmPerKm = fields.includes("rOhmPerKm");
    const xOhmPerKm = fields.includes("xOhmPerKm");

    return {
      id,
      prevNode: prevNode ?? {
        select: this.toNode(fields),
      },
      nextNode: nextNode ?? {
        select: this.toNode(fields),
      },
      lengthM,
      phase,
      code,
      rOhmPerKm,
      xOhmPerKm,
    };
  }

  static toSample(fields: string[]): SampleSelect {
    const id = fields.includes("id");
    const num = fields.includes("num");
    const hour = fields.includes("hour");
    const minute = fields.includes("minute");
    const val = fields.includes("val");
    const season = fields.includes("season");
    const type = fields.includes("type");

    return {
      id,
      num,
      hour,
      minute,
      val,
      season,
      type,
    };
  }
}

type FeederSelect = { id: boolean; networkNum: boolean; feederNum: boolean };
type NodeSelect = {
  id: boolean;
  feeder: boolean | { select: FeederSelect };
  num: boolean;
  posX: boolean;
  posY: boolean;
  hasLoad: boolean;
};
type LineSelect = {
  id: boolean;
  prevNode: boolean | { select: NodeSelect };
  nextNode: boolean | { select: NodeSelect };
  lengthM: boolean;
  phase: boolean;
  code: boolean;
  rOhmPerKm: boolean;
  xOhmPerKm: boolean;
};
type SampleSelect = {
  id: boolean;
  num: boolean;
  hour: boolean;
  minute: boolean;
  val: boolean;
  season: boolean;
  type: boolean;
};
