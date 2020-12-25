import { Joint } from "../../../domain/model/Joint";
import { JointRO } from "./JointRO";
import { JointsRO } from "./JointsRO";

export class JointPresenter {
  serialize(joint: Joint): JointRO {
    return {
      joint: this.toJson(joint),
    };
  }

  serializeArray(joints: Joint[]): JointsRO {
    const modJoints = joints.map(this.toJson);
    return {
      jointCount: modJoints.length,
      joints: modJoints,
    };
  }

  private toJson(joint: Joint) {
    return joint;
  }
}
