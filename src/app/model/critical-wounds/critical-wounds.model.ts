import {ConditionOld} from "../conditionsOld/condition.model";
import {InjuryOld} from "../injuresOld/injures-list.model";
import {Model} from "../model";
import {BodyLocalization} from "../body-localization/body-localization.model";

export class CriticalWound extends Model{
  bodyLocalization: BodyLocalization;
  criticalConditions: ConditionOld[];
  criticalInjuries: InjuryOld[];

  constructor(name?: string, nameTranslation?: string, bodyLocalization?: BodyLocalization, criticalConditions?: ConditionOld[], criticalInjury?: InjuryOld[]) {
    super(name, nameTranslation);
    this.bodyLocalization = <BodyLocalization>bodyLocalization;
    this.criticalConditions = <ConditionOld[]>criticalConditions;
    this.criticalInjuries = <InjuryOld[]>criticalInjury;
  }

  removeCondition(condition: Model) {
    let index = this.criticalConditions.findIndex(c => c.base.name === condition.name);
    this.criticalConditions.splice(index, 1);
  }

  static fromJSON(object: Object): CriticalWound {
    let criticalWound = Object.assign(new CriticalWound(), object);
    criticalWound.bodyLocalization = BodyLocalization.fromJSON(criticalWound['bodyLocalization']);
    criticalWound.criticalConditions = ConditionOld.arrayFromJSON(criticalWound['criticalConditions']);
    criticalWound.criticalInjuries = InjuryOld.arrayFromJSON(criticalWound['criticalInjuries']);
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
