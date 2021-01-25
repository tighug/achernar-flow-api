export class FieldSelector {
  static toFeeder(fields: string[]): FeederSelect {
    const id = !fields.length || fields.includes("id");
    const networkNum = !fields.length || fields.includes("networkNum");
    const feederNum = !fields.length || fields.includes("feederNum");

    return { id, networkNum, feederNum };
  }

  static toNode(fields: string[]): NodeSelect {
    const id = !fields.length || fields.includes("id");
    const feeder = !fields.length || fields.includes("feeder");
    const num = !fields.length || fields.includes("num");
    const posX = !fields.length || fields.includes("posX");
    const posY = !fields.length || fields.includes("posY");
    const hasLoad = !fields.length || fields.includes("hasLoad");

    return {
      id,
      feeder: feeder ? { select: this.toFeeder(fields) } : false,
      num,
      posX,
      posY,
      hasLoad,
    };
  }

  static toLine(fields: string[]): LineSelect {
    const id = !fields.length || fields.includes("id");
    const prevNode = !fields.length || fields.includes("prevNode");
    const nextNode = !fields.length || fields.includes("nextNode");
    const lengthM = !fields.length || fields.includes("lengthM");
    const phase = !fields.length || fields.includes("phase");
    const code = !fields.length || fields.includes("code");
    const rOhmPerKm = !fields.length || fields.includes("rOhmPerKm");
    const xOhmPerKm = !fields.length || fields.includes("xOhmPerKm");

    return {
      id,
      prevNode: prevNode
        ? {
            select: this.toNode(fields),
          }
        : false,
      nextNode: nextNode
        ? {
            select: this.toNode(fields),
          }
        : false,
      lengthM,
      phase,
      code,
      rOhmPerKm,
      xOhmPerKm,
    };
  }

  static toSample(fields: string[]): SampleSelect {
    const id = !fields.length || fields.includes("id");
    const num = !fields.length || fields.includes("num");
    const hour = !fields.length || fields.includes("hour");
    const minute = !fields.length || fields.includes("minute");
    const val = !fields.length || fields.includes("val");
    const season = !fields.length || fields.includes("season");
    const type = !fields.length || fields.includes("type");

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
