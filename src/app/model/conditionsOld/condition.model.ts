import {Model} from "../model";

export class ConditionOld {
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

  static fromJSON(object: Object): ConditionOld {
    let condition = Object.assign(new ConditionOld(), object);
    condition.base = Model.fromJSON(condition['base']);
    return condition;
  }

  static arrayFromJSON(objectsArray: Object[]): ConditionOld[] {
    let conditions = [];
    for (let object of objectsArray) {
      let condition = ConditionOld.fromJSON(object);
      conditions.push(condition);
    }
    return conditions;
  }
}
