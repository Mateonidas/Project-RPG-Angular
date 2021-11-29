import {Condition} from "../conditions/condition.model";
import {Injury} from "../injures/injures-list.model";
import {Model} from "../model";

export class CriticalWound {
  name!: string;
  criticalConditions!: CriticalCondition[];
  criticalInjury!: Injury[];

  constructor(name?: string, criticalConditions?: CriticalCondition[], criticalInjury?: Injury[]) {
    this.name = <string>name;
    this.criticalConditions = <CriticalCondition[]>criticalConditions;
    this.criticalInjury = <Injury[]>criticalInjury;
  }

  removeCondition(condition: Model) {
    let index = this.criticalConditions.findIndex(c => c.base.base.name === condition.nameTranslation);
    this.criticalConditions.splice(index, 1);
  }

  static fromJSON(object: Object): CriticalWound {
    let criticalWound = Object.assign(new CriticalWound(), object);
    criticalWound.criticalConditions = CriticalCondition.arrayFromJSON(criticalWound['criticalConditions']);
    criticalWound.criticalInjury = Injury.arrayFromJSON(criticalWound['criticalInjury']);
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
