import { BidCase } from "../model/BidCase";
import { Bidder } from "../model/Bidder";
import { Load } from "../model/Load";
import { NodalPrice } from "../model/NodalPrice";
import { Random } from "./Random";
import { shuffleArray } from "./shuffleArray";

const priceStep = 0.01;

export class BidderService {
  static async getBuyersAndSellers(
    bidCase: Required<BidCase>,
    loads: Load[],
    pvs: Load[]
  ): Promise<[Bidder[], Bidder[]]> {
    const {
      buyerCount,
      sellerCount,
      minBuyPrice,
      maxBuyPrice,
      minBuyVolume,
      maxBuyVolume,
      minSellPrice,
      maxSellPrice,
      seed,
    } = bidCase;

    const rand = new Random(seed);
    const modLoads = loads.filter(
      (l) => pvs.findIndex((pv) => pv.node.id === l.node.id) < 0
    );
    const modPVs = pvs.filter((pv) => {
      const matchedLoad = loads.find((l) => l.node.id === pv.node.id);
      if (matchedLoad === undefined) throw new Error("load is missing.");
      return pv.val - matchedLoad.val > 0;
    });
    const shuffledLoads = shuffleArray(modLoads, rand);
    const shuffledPVs = shuffleArray(modPVs, rand);
    const buyers = Array.from(Array(buyerCount).keys()).map(
      (i) =>
        new Bidder({
          bidCase,
          node: shuffledLoads[i].node,
          price: rand.getBetween(minBuyPrice, maxBuyPrice),
          volume: rand.getBetween(minBuyVolume, maxBuyVolume),
          type: "buyer",
        })
    );
    const sellers = Array.from(Array(sellerCount).keys()).map((i) => {
      const matchedLoad = loads.find(
        (l) => l.node.id === shuffledPVs[i].node.id
      );
      if (matchedLoad === undefined) throw new Error("load is missing.");

      return new Bidder({
        bidCase,
        node: shuffledPVs[i].node,
        price: rand.getBetween(minSellPrice, maxSellPrice),
        volume: Math.floor((shuffledPVs[i].val - matchedLoad.val) * 1000),
        type: "seller",
      });
    });
    return [buyers, sellers];
  }

  static calcAgreedPrice(
    buyers: Bidder[],
    sellers: Bidder[],
    nodalPrices: NodalPrice[]
  ): [number, number] {
    let gap = 100000000; // Big number
    for (let agreedPrice = 0; ; agreedPrice += priceStep) {
      const buyAgreedSum = this.getBuyAgreedSum(
        buyers,
        agreedPrice,
        nodalPrices
      );
      const sellAgreedSum = this.getSellAgreedSum(
        sellers,
        agreedPrice,
        nodalPrices
      );

      gap = buyAgreedSum - sellAgreedSum;

      if (gap <= 0) return [agreedPrice, gap];
    }
  }

  private static getBuyAgreedSum(
    buyers: Bidder[],
    agreedPrice: number,
    nodalPrices: NodalPrice[]
  ): number {
    let sum = 0;

    buyers.forEach((b) => {
      const nodalPrice = nodalPrices.find((n) => n.node.id === b.node.id);
      if (nodalPrice === undefined) throw new Error("nodalPrice is undefined.");
      const nodalAgreedPrice = nodalPrice.value + agreedPrice;

      if (b.price >= nodalAgreedPrice) sum += b.volume;
    });

    return sum;
  }

  private static getSellAgreedSum(
    sellers: Bidder[],
    agreedPrice: number,
    nodalPrices: NodalPrice[]
  ): number {
    let sum = 0;

    sellers.forEach((s) => {
      const nodalPrice = nodalPrices.find((n) => n.node.id === s.node.id);
      if (nodalPrice === undefined) throw new Error("nodalPrice is undefined.");
      const nodalAgreedPrice = nodalPrice.value + agreedPrice;

      if (s.price <= nodalAgreedPrice) sum += s.volume;
    });

    return sum;
  }
}
