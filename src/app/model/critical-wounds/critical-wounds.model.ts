import {Condition} from "../conditions/condition.model";
import {Injury} from "../injures/injures-list.model";
import {Model} from "../model";
import {BodyLocalization} from "../body-localization/body-localization.model";

export class CriticalWound extends Model{
  bodyLocalization: BodyLocalization;
  criticalConditions: Condition[];
  criticalInjuries: Injury[];

  constructor(name?: string, nameTranslation?: string, bodyLocalization?: BodyLocalization, criticalConditions?: Condition[], criticalInjury?: Injury[]) {
    super(name, nameTranslation);
    this.bodyLocalization = <BodyLocalization>bodyLocalization;
    this.criticalConditions = <Condition[]>criticalConditions;
    this.criticalInjuries = <Injury[]>criticalInjury;
  }

  removeCondition(condition: Model) {
    let index = this.criticalConditions.findIndex(c => c.base.name === condition.name);
    this.criticalConditions.splice(index, 1);
  }

  static fromJSON(object: Object): CriticalWound {
    let criticalWound = Object.assign(new CriticalWound(), object);
    criticalWound.bodyLocalization = BodyLocalization.fromJSON(criticalWound['bodyLocalization']);
    criticalWound.criticalConditions = Condition.arrayFromJSON(criticalWound['criticalConditions']);
    criticalWound.criticalInjuries = Injury.arrayFromJSON(criticalWound['criticalInjuries']);
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
