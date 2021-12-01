import {Model} from "../model";

export class Condition {
  base: Model;
  value: number;
  incurableValue: number;

  constructor(model?: Model, value?: number, incurableValue?: number) {
    this.base = <Model>model

    if(value != undefined) {
      this.value = <number>value;
    } else {
      this.value = 1;
    }

    if(incurableValue != undefined) {
      this.incurableValue = <number>incurableValue;
    } else {
      this.incurableValue = 0;
    }
  }

  static fromJSON(object: Object): Condition {
    let condition = Object.assign(new Condition(), object);
    condition.base = Model.fromJSON(condition['base']);
    return condition;
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
