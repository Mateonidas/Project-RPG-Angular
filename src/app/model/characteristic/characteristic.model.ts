import {Model} from "../model";

export class Characteristic extends Model {
  static fromJSON(object: Object): Characteristic {
    return Object.assign(new Characteristic(), object);
  }
}

