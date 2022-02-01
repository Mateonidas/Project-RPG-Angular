// import {ListModel} from "../list-model";
// import {CriticalWound} from "./critical-wounds.model";
// import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
// import {BodyLocalizationList} from "../body-localization/body-localization.model";
// import {Condition} from "../conditions/condition.model";
// import {ConditionsList} from "../conditions/conditions-list.model";
// import {InjuresList, Injury} from "../injures/injures-list.model";
//
// export class CriticalWoundsList extends ListModel {
//
//   public static list: CriticalWound[] = [
//     new CriticalWound(TextResourceService.getCriticalWoundText('DramaticInjury').name, TextResourceService.getCriticalWoundText('DramaticInjury').nameTranslation, BodyLocalizationList.head, [new Condition(ConditionsList.bleeding)], []),
//     new CriticalWound(TextResourceService.getCriticalWoundText('MinorCut').name, TextResourceService.getCriticalWoundText('MinorCut').nameTranslation, BodyLocalizationList.head, [new Condition(ConditionsList.bleeding)], []),
//     new CriticalWound(TextResourceService.getCriticalWoundText('PokedEye').name, TextResourceService.getCriticalWoundText('PokedEye').nameTranslation, BodyLocalizationList.head, [new Condition(ConditionsList.blinded)], []),
//     new CriticalWound(TextResourceService.getCriticalWoundText('EarBash').name, TextResourceService.getCriticalWoundText('EarBash').nameTranslation, BodyLocalizationList.head, [new Condition(ConditionsList.deafened)], []),
//     new CriticalWound(TextResourceService.getCriticalWoundText('RattlingBlow').name, TextResourceService.getCriticalWoundText('RattlingBlow').nameTranslation, BodyLocalizationList.head, [new Condition(ConditionsList.stunned)], []),
//     new CriticalWound(TextResourceService.getCriticalWoundText('BlackEye').name, TextResourceService.getCriticalWoundText('BlackEye').nameTranslation, BodyLocalizationList.head, [new Condition(ConditionsList.blinded, 2)], []),
//     new CriticalWound(TextResourceService.getCriticalWoundText('SlicedEar').name, TextResourceService.getCriticalWoundText('SlicedEar').nameTranslation, BodyLocalizationList.head, [new Condition(ConditionsList.stunned, 2), new Condition(ConditionsList.bleeding)], []),
//     new CriticalWound(TextResourceService.getCriticalWoundText('StruckForehead').name, TextResourceService.getCriticalWoundText('StruckForehead').nameTranslation, BodyLocalizationList.head, [new Condition(ConditionsList.bleeding, 2), new Condition(ConditionsList.blinded, 1, 1)], []),
//     new CriticalWound(TextResourceService.getCriticalWoundText('FracturedJaw').name, TextResourceService.getCriticalWoundText('FracturedJaw').nameTranslation, BodyLocalizationList.head, [new Condition(ConditionsList.stunned, 2)], [new Injury(InjuresList.minorBrokenBone, BodyLocalizationList.head)]),
//     new CriticalWound(TextResourceService.getCriticalWoundText('MajorEyeWound').name, TextResourceService.getCriticalWoundText('MajorEyeWound').nameTranslation, BodyLocalizationList.head, [new Condition(ConditionsList.bleeding), new Condition(ConditionsList.blinded, 1, 1)], []),
//     new CriticalWound(TextResourceService.getCriticalWoundText('MajorEarWound').name, TextResourceService.getCriticalWoundText('MajorEarWound').nameTranslation, BodyLocalizationList.head, [], []),
//     new CriticalWound(TextResourceService.getCriticalWoundText('BrokenNose').name, TextResourceService.getCriticalWoundText('BrokenNose').nameTranslation, BodyLocalizationList.head, [new Condition(ConditionsList.blinded, 2), new Condition(ConditionsList.stunned)], []),
//     new CriticalWound(TextResourceService.getCriticalWoundText('BrokenJaw').name, TextResourceService.getCriticalWoundText('BrokenJaw').nameTranslation, BodyLocalizationList.head, [new Condition(ConditionsList.stunned, 3), new Condition(ConditionsList.deafened)], [new Injury(InjuresList.majorBrokenBone, BodyLocalizationList.head)]),
//   ]
//
//   public static getListItemByName(name: string) {
//     return <CriticalWound>this.list.find(x => x.name == name);
//   }
//
//   static get dramaticInjury(): CriticalWound {
//     return this.getListItemByName('DramaticInjury');
//   }
//
//   static get minorCut(): CriticalWound {
//     return this.getListItemByName('MinorCut');
//   }
//
//   static get pokedEye(): CriticalWound {
//     return this.getListItemByName('PokedEye');
//   }
//
//   static get earBash(): CriticalWound {
//     return this.getListItemByName('EarBash');
//   }
//
//   static get rattlingBlow(): CriticalWound {
//     return this.getListItemByName('RattlingBlow');
//   }
//
//   static get blackEye(): CriticalWound {
//     return this.getListItemByName('BlackEye');
//   }
//
//   static get slicedEar(): CriticalWound {
//     return this.getListItemByName('SlicedEar');
//   }
//
//   static get struckForehead(): CriticalWound {
//     return this.getListItemByName('StruckForehead');
//   }
//
//   static get fracturedJaw(): CriticalWound {
//     return this.getListItemByName('FracturedJaw');
//   }
//
//   static get majorEyeWound(): CriticalWound {
//     return this.getListItemByName('MajorEyeWound');
//   }
//
//   static get majorEarWound(): CriticalWound {
//     return this.getListItemByName('MajorEarWound');
//   }
//
//   static get brokenNose(): CriticalWound {
//     return this.getListItemByName('BrokenNose');
//   }
//
//   static get brokenJaw(): CriticalWound {
//     return this.getListItemByName('BrokenJaw');
//   }
// }
