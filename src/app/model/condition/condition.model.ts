import {Model} from "../model";

export class Condition extends Model {
  public description: string;

  constructor(name?: string, nameTranslation?: string, id?: number, description?: string) {
    super(name, nameTranslation, id);
    this.description = <string>description;
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
