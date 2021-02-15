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

  static toCase(fields: string[]): CaseSelect {
    const id = !fields.length || fields.includes("id");
    const feeder = !fields.length || fields.includes("feeder");
    const hour = !fields.length || fields.includes("hour");
    const minute = !fields.length || fields.includes("minute");
    const pvCount = !fields.length || fields.includes("pvCount");
    const pvScale = !fields.length || fields.includes("pvScale");
    const loadScale = !fields.length || fields.includes("loadScale");
    const baseV = !fields.length || fields.includes("baseV");
    const seed = !fields.length || fields.includes("seed");
    const status = !fields.length || fields.includes("status");

    return {
      id,
      feeder: feeder ? { select: this.toFeeder(fields) } : false,
      hour,
      minute,
      pvCount,
      pvScale,
      loadScale,
      baseV,
      seed,
      status,
    };
  }

  static toFlow(fields: string[]): FlowSelect {
    const id = !fields.length || fields.includes("id");
    const c = !fields.length || fields.includes("case");
    const line = !fields.length || fields.includes("line");
    const nextNodeP = !fields.length || fields.includes("nextNodeP");
    const nextNodeV = !fields.length || fields.includes("nextNodeV");
    const lineI = !fields.length || fields.includes("lineI");
    const type = !fields.length || fields.includes("type");
    const bidCaseId = !fields.length || fields.includes("bidCaseId");

    return {
      id,
      case: c ? { select: this.toCase(fields) } : false,
      line: line ? { select: this.toLine(fields) } : false,
      nextNodeP,
      nextNodeV,
      lineI,
      type,
      bidCaseId,
    };
  }

  static toLoad(fields: string[]): LoadSelect {
    const id = !fields.length || fields.includes("id");
    const c = !fields.length || fields.includes("case");
    const node = !fields.length || fields.includes("node");
    const val = !fields.length || fields.includes("val");
    const type = !fields.length || fields.includes("type");

    return {
      id,
      case: c ? { select: this.toCase(fields) } : false,
      node: node ? { select: this.toNode(fields) } : false,
      val,
      type,
    };
  }

  static toBidCase(fields: string[]): BidCaseSelect {
    const id = !fields.length || fields.includes("id");
    const c = !fields.length || fields.includes("case");
    const buyerCount = !fields.length || fields.includes("buyerCount");
    const sellerCount = !fields.length || fields.includes("sellerCount");
    const minBuyPrice = !fields.length || fields.includes("minBuyPrice");
    const maxBuyPrice = !fields.length || fields.includes("maxBuyPrice");
    const minSellPrice = !fields.length || fields.includes("minSellPrice");
    const maxSellPrice = !fields.length || fields.includes("maxSellPrice");
    const minBuyVolume = !fields.length || fields.includes("minBuyVolume");
    const maxBuyVolume = !fields.length || fields.includes("maxBuyVolume");
    const minSellVolume = !fields.length || fields.includes("minSellVolume");
    const maxSellVolume = !fields.length || fields.includes("maxSellVolume");
    const seed = !fields.length || fields.includes("seed");
    const status = !fields.length || fields.includes("status");

    return {
      id,
      case: c ? { select: this.toCase(fields) } : false,
      buyerCount,
      sellerCount,
      minBuyPrice,
      maxBuyPrice,
      minSellPrice,
      maxSellPrice,
      minBuyVolume,
      maxBuyVolume,
      minSellVolume,
      maxSellVolume,
      seed,
      status,
    };
  }

  static toBidder(fields: string[]): BidderSelect {
    const id = !fields.length || fields.includes("id");
    const bidCase = !fields.length || fields.includes("bidCase");
    const node = !fields.length || fields.includes("node");
    const price = !fields.length || fields.includes("price");
    const volume = !fields.length || fields.includes("volume");
    const agreed = !fields.length || fields.includes("agreed");
    const type = !fields.length || fields.includes("type");

    return {
      id,
      bidCase: bidCase ? { select: this.toBidCase(fields) } : false,
      node: node ? { select: this.toNode(fields) } : false,
      price,
      volume,
      agreed,
      type,
    };
  }

  static toNodalPrice(fields: string[]): NodalPriceSelect {
    const id = !fields.length || fields.includes("id");
    const bidCase = !fields.length || fields.includes("bidCase");
    const node = !fields.length || fields.includes("node");
    const muIp = !fields.length || fields.includes("muIp");
    const muIn = !fields.length || fields.includes("muIn");
    const muVp = !fields.length || fields.includes("muVp");
    const muVn = !fields.length || fields.includes("muVn");
    const value = !fields.length || fields.includes("value");

    return {
      id,
      bidCase: bidCase ? { select: this.toBidCase(fields) } : false,
      node: node ? { select: this.toNode(fields) } : false,
      muIp,
      muIn,
      muVp,
      muVn,
      value,
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
export type CaseSelect = {
  id: boolean;
  feeder: boolean | { select: FeederSelect };
  hour: boolean;
  minute: boolean;
  pvCount: boolean;
  pvScale: boolean;
  loadScale: boolean;
  baseV: boolean;
  seed: boolean;
  status: boolean;
};
export type FlowSelect = {
  id: boolean;
  case: boolean | { select: CaseSelect };
  line: boolean | { select: LineSelect };
  nextNodeP: boolean;
  nextNodeV: boolean;
  lineI: boolean;
  type: boolean;
  bidCaseId: boolean;
};
export type LoadSelect = {
  id: boolean;
  case: boolean | { select: CaseSelect };
  node: boolean | { select: NodeSelect };
  val: boolean;
  type: boolean;
};
export type BidCaseSelect = {
  id: boolean;
  case: boolean | { select: CaseSelect };
  buyerCount: boolean;
  sellerCount: boolean;
  minBuyPrice: boolean;
  maxBuyPrice: boolean;
  minSellPrice: boolean;
  maxSellPrice: boolean;
  minBuyVolume: boolean;
  maxBuyVolume: boolean;
  minSellVolume: boolean;
  maxSellVolume: boolean;
  seed: boolean;
  status: boolean;
};
export type BidderSelect = {
  id: boolean;
  bidCase: boolean | { select: BidCaseSelect };
  node: boolean | { select: NodeSelect };
  price: boolean;
  volume: boolean;
  agreed: boolean;
  type: boolean;
};
export type NodalPriceSelect = {
  id: boolean;
  bidCase: boolean | { select: BidCaseSelect };
  node: boolean | { select: NodeSelect };
  muIp: boolean;
  muIn: boolean;
  muVp: boolean;
  muVn: boolean;
  value: boolean;
};
