import {Condition} from "../conditions/condition.model";

export class CriticalWound {
  name!: string;
  criticalConditions!: CriticalCondition[];

  constructor(name?: string, criticalConditions?: CriticalCondition[]) {
    this.name = <string>name;
    this.criticalConditions = <CriticalCondition[]>criticalConditions;
  }

  static fromJSON(object: Object): CriticalWound {
    let criticalWound = Object.assign(new CriticalWound(), object);
    criticalWound.criticalConditions = CriticalCondition.arrayFromJSON(criticalWound['criticalConditions']);
    return criticalWound;
  }

  static arrayFromJSON(objectsArray: Object[]): CriticalWound[] {
    let criticalWounds = [];
    for (let object of objectsArray) {
      let criticalWound = CriticalWound.fromJSON(object);
      criticalWounds.push(criticalWound);
    }
    return criticalWounds;
  }
}

export class CriticalCondition {
  base!: Condition;
  isCurable!: boolean;


  constructor(base?: Condition, isCurable?: boolean) {
    this.base = <Condition>base;
    this.isCurable = <boolean>isCurable;
  }

  static fromJSON(object: Object): CriticalCondition {
    let criticalCondition = Object.assign(new CriticalCondition(), object);
    criticalCondition.base = Condition.fromJSON(criticalCondition['base']);
    return criticalCondition;
  }

  static arrayFromJSON(objectsArray: Object[]): CriticalCondition[] {
    let criticalConditions = [];
    for (let object of objectsArray) {
      let criticalCondition = CriticalCondition.fromJSON(object);
      criticalConditions.push(criticalCondition);
    }
    return criticalConditions;
  }
}
