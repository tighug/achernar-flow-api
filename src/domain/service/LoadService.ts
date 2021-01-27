import { Load } from "../model/Load";
import { ISampleRepository } from "../repository/ISampleRepository";
import { INodeRepository } from "../repository/INodeRepository";
import { Random } from "./Random";
import { Node } from "../model/Node";
import { Sample } from "../model/Sample";
import { Case } from "../model/Case";

export class LoadService {
  constructor(
    private readonly sampleRepository: ISampleRepository,
    private readonly nodeRepository: INodeRepository
  ) {}

  async getLoadsAndPVs(c: Required<Case>): Promise<[Load[], Load[]]> {
    const { feeder, hour, minute, pvCount, pvScale, loadScale, seed } = c;
    const rand = new Random(seed);
    const [loadSamples, pvSamples, nodes] = await Promise.all([
      this.sampleRepository.findMany({
        hour,
        minute,
        season: "summer",
        type: "load",
      }) as Promise<Required<Sample>[]>,
      this.sampleRepository.findMany({
        hour,
        minute,
        season: "summer",
        type: "pv",
      }) as Promise<Required<Sample>[]>,
      this.nodeRepository.findMany(feeder.id) as Promise<Required<Node>[]>,
    ]);
    const houses = nodes.filter((n) => n.hasLoad);
    const loads = Array.from(
      Array(houses.length),
      () => loadSamples[rand.getBetween(0, loadSamples.length - 1)]
    ).map(
      (load, i) =>
        new Load({
          case: c,
          node: houses[i],
          val: load.val * loadScale,
          type: "load",
        })
    );
    const shuffledHouses = this.shuffle(houses);
    const pvs = Array.from(
      Array(pvCount),
      () => pvSamples[rand.getBetween(0, pvSamples.length - 1)]
    ).map(
      (pv, i) =>
        new Load({
          case: c,
          node: shuffledHouses[i],
          val: pv.val * pvScale,
          type: "pv",
        })
    );

    return [loads, pvs];
  }

  private shuffle([...array]) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
