import { Flow } from "../model/Flow";
import { NodalPrice } from "../model/NodalPrice";

const COEFF_V = 100;
const COEFF_I = 0.01;
const TOL_V = 0.2;
const TOL_I = 3;
const MAX_VOLTAGE = 253;
const MIN_VOLTAGE = 216.2;

export class NodalPriceService {
  static calcLagrange(flows: Flow[], nodalPrices: NodalPrice[]): void {
    // const lineIRanges = afterFlows.map((initFlow) => {
    //   const range = initFlow.lineI * MAX_CURRENT_MULTIPLIER;
    //   return range < MIN_MAX_CURRENT ? MIN_MAX_CURRENT : range;
    // });
    // const maxlineIs = lineIRanges;
    // const minLineIs = lineIRanges.map((r) => -1 * r);

    flows.forEach((f, i) => {
      // const excessMaxLineI = f.lineI - maxlineIs[i];
      // const excessMinLineI = minLineIs[i] - f.lineI;
      const excessMaxNodeV = f.nextNodeV - MAX_VOLTAGE;
      const excessMinNodeV = MIN_VOLTAGE - f.nextNodeV;

      // nodalPrices[i].muIp = this.calcMuIp(excessMaxLineI, nodalPrices[i].muIp);
      // nodalPrices[i].muIn = this.calcMuIn(excessMinLineI, nodalPrices[i].muIn);
      nodalPrices[i].muVp = this.calcMuVp(excessMaxNodeV, nodalPrices[i].muVp);
      nodalPrices[i].muVn = this.calcMuVn(excessMinNodeV, nodalPrices[i].muVn);
    });
  }

  static calcNodalPrices(flows: Flow[], nodalPrices: NodalPrice[]): void {
    const zOhms = flows.map((f) => (f.line.rOhmPerKm * f.line.lengthM) / 1000);
    nodalPrices.forEach((np, i) => {
      if (i === 0) np.value = 0;
      else {
        const flow = flows.find((f) => f.line.nextNode.id === np.node.id);

        if (flow === undefined) throw new Error("flow is undefined.");

        const myNodeV = flow.nextNodeV;

        for (let k = 0; k <= i; k++) {
          const zOhm = k === 0 ? 0 : zOhms[k - 1];
          const deltaI = 1 / myNodeV;

          np.value += (nodalPrices[k].muIp - nodalPrices[k].muIn) * deltaI;
          np.value -=
            (nodalPrices[k].muVp - nodalPrices[k].muVn) * deltaI * zOhm;
        }
      }
    });
  }

  private static calcMuIp(excess: number, muIp: number): number {
    if (excess <= 0) return 0;
    if (excess <= TOL_I) return muIp;

    return muIp + COEFF_I * excess;
  }

  private static calcMuIn(excess: number, muIn: number): number {
    if (excess <= 0) return 0;
    if (excess <= TOL_I) return muIn;

    return muIn + COEFF_I * excess;
  }

  private static calcMuVp(excess: number, muVp: number): number {
    if (excess <= 0) return 0;
    if (excess <= TOL_V) return muVp;

    return muVp + COEFF_V * excess;
  }

  private static calcMuVn(excess: number, muVn: number): number {
    if (excess <= 0) return 0;
    if (excess <= TOL_V) return muVn;

    return muVn + COEFF_V * excess;
  }
}
