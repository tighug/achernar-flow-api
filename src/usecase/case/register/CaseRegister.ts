import createHttpError from "http-errors";
import { Case } from "../../../domain/model/Case";
import { Feeder } from "../../../domain/model/Feeder";
import { ICaseRepository } from "../../../domain/repository/ICaseRepository";
import { IFeederRepository } from "../../../domain/repository/IFeederRepository";
import { CaseRegisterInput } from "./CaseRegisterInput";
import { CaseRegisterOutput } from "./CaseRegisterOutput";
import { ICaseRegister } from "./ICaseRegister";

export class CaseRegister implements ICaseRegister {
  constructor(
    private readonly caseRepository: ICaseRepository,
    private readonly feederRepository: IFeederRepository
  ) {}

  async handle(props: CaseRegisterInput): Promise<CaseRegisterOutput> {
    const feeder = await this.feederRepository.findOne({
      id: props.feederId,
      fields: [],
    });

    if (feeder === null)
      throw new createHttpError.NotFound("feeder is not found.");

    return this.caseRepository.save(
      new Case({ ...props, feeder: feeder as Feeder })
    );
  }
}
