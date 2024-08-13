import {Model} from "../model";

export class Condition extends Model {
  public hasCounter: boolean;

  constructor(name?: string, hasCounter?: boolean) {
    super(name);
    this.hasCounter = <boolean>hasCounter;
  }

  static fromJSON(object: Object): Condition {
    return Object.assign(new Condition(), object);
  }

  static arrayFromJSON(objectsArray: Object[]): Condition[] {
    let conditions = [];
    for (let object of objectsArray) {
      let condition = Condition.fromJSON(object);
      conditions.push(condition);
    }
    return conditions;
  }
}
