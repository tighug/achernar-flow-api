/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import createHttpError from "http-errors";
import validator from "validator";

export class Sanitizer {
  static toId(id: any, required = true, init = 0): number {
    const name = "id";

    if (required) this.checkNotEmpty(id, name);
    else if (id === undefined) return init;

    this.checkInt(String(id), name);

    return Number(id);
  }

  static toFeederId(feederId: any, required = true, init = 0): number {
    const name = "feederId";

    if (required) this.checkNotEmpty(feederId, name);
    else if (feederId === undefined) return init;

    this.checkInt(String(feederId), name);

    return Number(feederId);
  }

  static toCaseId(caseId: any, required = true, init = 0): number {
    const name = "caseId";

    if (required) this.checkNotEmpty(caseId, name);
    else if (caseId === undefined) return init;

    this.checkInt(String(caseId), name);

    return Number(caseId);
  }

  static toBidCaseId(bidCaseId: any, required = true, init = 0): number {
    const name = "bidCaseId";

    if (required) this.checkNotEmpty(bidCaseId, name);
    else if (bidCaseId === undefined) return init;

    this.checkInt(String(bidCaseId), name);

    return Number(bidCaseId);
  }

  static toFields(fields: any, required = true, init = []): string[] {
    const name = "fields";

    if (required) this.checkNotEmpty(fields, name);
    else if (fields === undefined) return init;

    this.checkString(fields, name);

    return fields.split(",");
  }

  static toHour(hour: any, required = true, init = 0): number {
    const name = "hour";

    if (required) this.checkNotEmpty(hour, name);
    else if (hour === undefined) return init;

    this.checkInt(String(hour), name);

    return Number(hour);
  }

  static toMinute(minute: any, required = true, init = 0): number {
    const name = "minute";

    if (required) this.checkNotEmpty(minute, name);
    else if (minute === undefined) return init;

    this.checkInt(String(minute), name);

    return Number(minute);
  }

  static toSeason(season: any, required = true, init = "summer"): string {
    const name = "season";

    if (required) this.checkNotEmpty(season, name);
    else if (season === undefined) return init;

    if (season !== "winter" && season !== "summer")
      throw new createHttpError.BadRequest("season must be summer/winter.");

    return season;
  }

  static toType(type: any, required = true, init = "load"): string {
    const name = "type";

    if (required) this.checkNotEmpty(type, name);
    else if (type === undefined) return init;

    if (type !== "load" && type !== "pv" && type !== "uchp" && type !== "ehp")
      throw new createHttpError.BadRequest("type must be load/pv/uchp/ehp.");

    return type;
  }

  static toPvCount(pvCount: any, required = true, init = 0): number {
    const name = "pvCount";

    if (required) this.checkNotEmpty(pvCount, name);
    else if (pvCount === undefined) return init;

    this.checkInt(String(pvCount), name);

    return Number(pvCount);
  }

  static toPvScale(pvScale: any, required = true, init = 0): number {
    const name = "pvScale";

    if (required) this.checkNotEmpty(pvScale, name);
    else if (pvScale === undefined) return init;

    this.checkNumeric(String(pvScale), name);

    return Number(pvScale);
  }

  static toLoadScale(loadScale: any, required = true, init = 0): number {
    const name = "loadScale";

    if (required) this.checkNotEmpty(loadScale, name);
    else if (loadScale === undefined) return init;

    this.checkNumeric(String(loadScale), name);

    return Number(loadScale);
  }

  static toBaseV(baseV: any, required = true, init = 0): number {
    const name = "baseV";

    if (required) this.checkNotEmpty(baseV, name);
    else if (baseV === undefined) return init;

    this.checkNumeric(String(baseV), name);

    return Number(baseV);
  }

  static toSeed(seed: any, required = true, init = 0): number {
    const name = "seed";

    if (required) this.checkNotEmpty(seed, name);
    else if (seed === undefined) return init;

    this.checkInt(String(seed), name);

    return Number(seed);
  }

  static toBuyerCount(buyerCount: any, required = true, init = 0): number {
    const name = "buyerCount";

    if (required) this.checkNotEmpty(buyerCount, name);
    else if (buyerCount === undefined) return init;

    this.checkInt(String(buyerCount), name);

    return Number(buyerCount);
  }

  static toSellerCount(sellerCount: any, required = true, init = 0): number {
    const name = "sellerCount";

    if (required) this.checkNotEmpty(sellerCount, name);
    else if (sellerCount === undefined) return init;

    this.checkInt(String(sellerCount), name);

    return Number(sellerCount);
  }

  static toMinBuyPrice(minBuyPrice: any, required = true, init = 0): number {
    const name = "minBuyPrice";

    if (required) this.checkNotEmpty(minBuyPrice, name);
    else if (minBuyPrice === undefined) return init;

    this.checkInt(String(minBuyPrice), name);

    return Number(minBuyPrice);
  }

  static toMaxBuyPrice(maxBuyPrice: any, required = true, init = 0): number {
    const name = "maxBuyPrice";

    if (required) this.checkNotEmpty(maxBuyPrice, name);
    else if (maxBuyPrice === undefined) return init;

    this.checkInt(String(maxBuyPrice), name);

    return Number(maxBuyPrice);
  }

  static toMinSellPrice(minSellPrice: any, required = true, init = 0): number {
    const name = "minSellPrice";

    if (required) this.checkNotEmpty(minSellPrice, name);
    else if (minSellPrice === undefined) return init;

    this.checkInt(String(minSellPrice), name);

    return Number(minSellPrice);
  }

  static toMaxSellPrice(maxSellPrice: any, required = true, init = 0): number {
    const name = "maxSellPrice";

    if (required) this.checkNotEmpty(maxSellPrice, name);
    else if (maxSellPrice === undefined) return init;

    this.checkInt(String(maxSellPrice), name);

    return Number(maxSellPrice);
  }

  static toMinBuyVolume(minBuyVolume: any, required = true, init = 0): number {
    const name = "minBuyVolume";

    if (required) this.checkNotEmpty(minBuyVolume, name);
    else if (minBuyVolume === undefined) return init;

    this.checkInt(String(minBuyVolume), name);

    return Number(minBuyVolume);
  }

  static toMaxBuyVolume(maxBuyVolume: any, required = true, init = 0): number {
    const name = "maxBuyVolume";

    if (required) this.checkNotEmpty(maxBuyVolume, name);
    else if (maxBuyVolume === undefined) return init;

    this.checkInt(String(maxBuyVolume), name);

    return Number(maxBuyVolume);
  }

  static toMinSellVolume(
    minSellVolume: any,
    required = true,
    init = 0
  ): number {
    const name = "minSellVolume";

    if (required) this.checkNotEmpty(minSellVolume, name);
    else if (minSellVolume === undefined) return init;

    this.checkInt(String(minSellVolume), name);

    return Number(minSellVolume);
  }

  static toMaxSellVolume(
    maxSellVolume: any,
    required = true,
    init = 0
  ): number {
    const name = "maxSellVolume";

    if (required) this.checkNotEmpty(maxSellVolume, name);
    else if (maxSellVolume === undefined) return init;

    this.checkInt(String(maxSellVolume), name);

    return Number(maxSellVolume);
  }

  static toBefore(before: any, required = true, init = false): boolean {
    const name = "before";

    if (required) this.checkNotEmpty(before, name);
    else if (before === undefined) return init;

    this.checkBoolean(String(before), name);

    return Boolean(before);
  }

  private static checkNotEmpty(data: any, name: string) {
    if (data === undefined)
      throw new createHttpError.BadRequest(`${name} is required.`);
  }

  private static checkString(data: any, name: string): void {
    if (typeof data !== "string")
      throw new createHttpError.BadRequest(`${name} must be string.`);
  }

  private static checkInt(data: string, name: string): void {
    if (!validator.isInt(data))
      throw new createHttpError.BadRequest(`${name} must be integer.`);
  }

  private static checkNumeric(data: string, name: string): void {
    if (!validator.isNumeric(data))
      throw new createHttpError.BadRequest(`${name} must be number.`);
  }

  private static checkBoolean(data: string, name: string): void {
    if (!validator.isBoolean(data))
      throw new createHttpError.BadRequest(`${name} must be boolean.`);
  }
}
