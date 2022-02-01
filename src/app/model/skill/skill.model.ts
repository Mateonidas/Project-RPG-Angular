import {Model} from "../model";

export class Skill extends Model {

  static fromJSON(object: Object): Skill {
    return Object.assign(new Skill(), object);
  }
}

