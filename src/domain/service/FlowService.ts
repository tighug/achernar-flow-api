import { Case } from "../model/Case";
import { Flow } from "../model/Flow";
import { Line } from "../model/Line";
import { IFlowRepository } from "../repository/IFlowRepository";
import { ILineRepository } from "../repository/ILineRepository";
import { LoadService } from "./LoadService";

const tolerance = 0.0001;

export class FlowService {
  constructor(
    private readonly lineRepository: ILineRepository,
    private readonly flowRepository: IFlowRepository,
    private readonly loadService: LoadService
  ) {}

  async calc(c: Required<Case>): Promise<void> {
    const lines = (await this.lineRepository.findMany({
      feederId: c.feeder.id,
      fields: [],
    })) as Required<Line>[];
    const [loads, pvs] = await this.loadService.getLoadsAndPVs(c);
    const flows = lines.map((l) => {
      const load = loads.find((load) => load.node.id === l.nextNode.id);
      const pv = pvs.find((pv) => pv.node.id === l.nextNode.id);
      const consume = load === undefined ? 0 : load.val * 1000;
      const prosume = pv === undefined ? 0 : pv.val * 1000;
      return new Flow({
        case: c,
        line: l,
        nextNodeP: consume - prosume,
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

    for (let i = 0; i < flows.length; i++) {
      await this.flowRepository.save(flows[i]);
    }
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
