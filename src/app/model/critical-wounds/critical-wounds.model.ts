import {Condition} from "../conditions/condition.model";
import {InjuryOld} from "../injures/injures-list.model";
import {Model} from "../model";
import {BodyLocalization} from "../body-localization/body-localization.model";

export class CriticalWound extends Model{
  bodyLocalization: BodyLocalization;
  criticalConditions: Condition[];
  criticalInjuries: InjuryOld[];

  constructor(name?: string, nameTranslation?: string, bodyLocalization?: BodyLocalization, criticalConditions?: Condition[], criticalInjury?: InjuryOld[]) {
    super(name, nameTranslation);
    this.bodyLocalization = <BodyLocalization>bodyLocalization;
    this.criticalConditions = <Condition[]>criticalConditions;
    this.criticalInjuries = <InjuryOld[]>criticalInjury;
  }

  removeCondition(condition: Model) {
    let index = this.criticalConditions.findIndex(c => c.base.name === condition.name);
    this.criticalConditions.splice(index, 1);
  }

  static fromJSON(object: Object): CriticalWound {
    let criticalWound = Object.assign(new CriticalWound(), object);
    criticalWound.bodyLocalization = BodyLocalization.fromJSON(criticalWound['bodyLocalization']);
    criticalWound.criticalConditions = Condition.arrayFromJSON(criticalWound['criticalConditions']);
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
