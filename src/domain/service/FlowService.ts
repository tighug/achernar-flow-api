import { Bidder } from "../model/Bidder";
import { Case } from "../model/Case";
import { Flow } from "../model/Flow";
import { Line } from "../model/Line";
import { Load } from "../model/Load";
import { ILineRepository } from "../repository/ILineRepository";

const tolerance = 0.001;

export class FlowService {
  constructor(private readonly lineRepository: ILineRepository) {}

  async calc(
    c: Required<Case>,
    loads: Load[],
    pvs: Load[],
    buyers: Bidder[] = [],
    sellers: Bidder[] = [],
    agreedPrice = 0,
    gap = 0
  ): Promise<Flow[]> {
    const lines = (await this.lineRepository.findMany(
      c.feeder.id
    )) as Required<Line>[];
    buyers.forEach((b) => {
      if (b.price >= agreedPrice) b.agreed = b.volume;
    });
    sellers.forEach((s) => {
      if (s.price < agreedPrice) s.agreed = s.volume;
    });
    const modSellers = sellers.sort((a, b) => b.price - a.price);
    for (let i = 0; gap > 0; i++) {
      const diff = modSellers[i].agreed - gap;
      if (diff >= 0) {
        modSellers[i].agreed = diff;
        gap = 0;
      } else {
        modSellers[i].agreed = 0;
        gap = -diff;
      }
    }
    const flows = lines.map((l) => {
      const load = loads.find((load) => load.node.id === l.nextNode.id);
      const pv = pvs.find((pv) => pv.node.id === l.nextNode.id);
      const buyer = buyers.find((b) => b.node.id === l.nextNode.id);
      const seller = modSellers.find((s) => s.node.id === l.nextNode.id);
      const consumedKw = load === undefined ? 0 : load.val;
      const producedKw = pv === undefined ? 0 : pv.val;
      const buyW = buyer === undefined ? 0 : buyer.agreed;
      const sellW = seller === undefined ? 0 : seller.agreed;
      const nextNodeP = (consumedKw - producedKw) * 1000 + buyW - sellW;
      return new Flow({
        case: c,
        line: l,
        nextNodeP,
        nextNodeV: c.baseV,
      });
    });

    let befFlows = [...flows];
    let finished = false;

    while (!finished) {
      // Calc lineI in DESC
      for (let i = flows.length - 1; i >= 0; i--) {
        flows[i].lineI = this.calcLineI(flows, i);
      }

      // Calc nodeV in ASC
      for (let i = 0; i < flows.length; i++) {
        flows[i].nextNodeV = this.calcNodeV(flows, i, c.baseV);
      }

      const befVs = befFlows.map((f) => f.nextNodeV);
      const aftVs = flows.map((f) => f.nextNodeV);

      if (this.checkSameV(befVs, aftVs)) finished = true;
      else befFlows = [...flows];
    }

    return flows;
  }

  private calcLineI(flows: Flow[], index: number): number {
    const flow = flows[index];
    const nextFlows = flows.filter(
      (f) => f.line.prevNode?.id === flow.line.nextNode?.id
    );
    const nextIs = nextFlows.map((nextFlow) => nextFlow.lineI);
    return (
      flow.nextNodeP / flow.nextNodeV +
      nextIs.reduce((acc, cur) => acc + cur, 0)
    );
  }

  private calcNodeV(flows: Flow[], index: number, baseV: number): number {
    const flow = flows[index];
    const zOhm = (flow.line.rOhmPerKm * flow.line.lengthM) / 1000;
    let prevV = baseV;

    if (index !== 0) {
      const prevFlow = flows.find(
        (f) => f.line.nextNode?.id === flow.line.prevNode?.id
      );
      if (prevFlow === undefined)
        throw new Error("prevNode is undefined on " + flow.line.prevNode?.num);
      prevV = prevFlow.nextNodeV;
    }

    return prevV - zOhm * flow.lineI;
  }

  private checkSameV(befVs: number[], aftVs: number[]): boolean {
    return aftVs.every((v, i) => {
      const gap = Math.abs(v - befVs[i]);
      return gap < tolerance;
    });
  }
}
