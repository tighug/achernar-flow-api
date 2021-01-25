/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import createHttpError from "http-errors";
import validator from "validator";

export class Sanitizer {
  static toId(id: any, required = true, init = 0): number {
    const name = "id";

    if (required) this.checkNotEmpty(id, name);
    else if (id === undefined) return init;

    this.checkString(id, name);
    this.checkInt(id, name);

    return Number(id);
  }

  static toFeederId(feederId: any, required = true, init = 0): number {
    const name = "feederId";

    if (required) this.checkNotEmpty(feederId, name);
    else if (feederId === undefined) return init;

    this.checkString(feederId, name);
    this.checkInt(feederId, name);

    return Number(feederId);
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

    this.checkString(hour, name);
    this.checkInt(hour, name);

    return Number(hour);
  }

  static toMinute(minute: any, required = true, init = 0): number {
    const name = "minute";

    if (required) this.checkNotEmpty(minute, name);
    else if (minute === undefined) return init;

    this.checkString(minute, name);
    this.checkInt(minute, name);

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

    this.checkString(pvCount, name);
    this.checkInt(pvCount, name);

    return Number(pvCount);
  }

  static toPvScale(pvScale: any, required = true, init = 0): number {
    const name = "pvScale";

    if (required) this.checkNotEmpty(pvScale, name);
    else if (pvScale === undefined) return init;

    this.checkString(pvScale, name);

    return Number(pvScale);
  }

  static toLoadScale(loadScale: any, required = true, init = 0): number {
    const name = "loadScale";

    if (required) this.checkNotEmpty(loadScale, name);
    else if (loadScale === undefined) return init;

    this.checkString(loadScale, name);

    return Number(loadScale);
  }

  static toSeed(seed: any, required = true, init = 0): number {
    const name = "seed";

    if (required) this.checkNotEmpty(seed, name);
    else if (seed === undefined) return init;

    this.checkString(seed, name);
    this.checkInt(seed, name);

    return Number(seed);
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
}
