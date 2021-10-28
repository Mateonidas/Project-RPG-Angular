import {Model} from "../model";
import {ListModel} from "../list-model";

export class BodyLocalization extends Model {
  public numericalInterval?: number[];

  constructor(name: string, nameTranslation: string, numericalInterval: number[]) {
    super(name, nameTranslation);
    this.numericalInterval = numericalInterval;
  }
}

export class BodyLocalizationList extends ListModel {

  public static list: BodyLocalization[] = [
    new BodyLocalization('head', 'Głowa', [1, 9]),
    new BodyLocalization('leftArm', 'Lewa ręka', [10, 24]),
    new BodyLocalization('rightArm', 'Prawa ręka', [25, 44]),
    new BodyLocalization('body', 'Korpus', [45, 79]),
    new BodyLocalization('leftLeg', 'Lewa noga', [80, 89]),
    new BodyLocalization('rightLeg', 'Prawa noga', [90, 100]),
  ];

  static get head(){
    return <BodyLocalization>BodyLocalizationList.getListItemByName('head');
  }

  static get leftArm() {
    return <BodyLocalization>BodyLocalizationList.getListItemByName('leftArm');
  }

  static get rightArm() {
    return <BodyLocalization>BodyLocalizationList.getListItemByName('rightArm');
  }

  static get body() {
    return <BodyLocalization>BodyLocalizationList.getListItemByName('body');
  }

  static get leftLeg() {
    return <BodyLocalization>BodyLocalizationList.getListItemByName('leftLeg');
  }

  static get rightLeg() {
    return <BodyLocalization>BodyLocalizationList.getListItemByName('rightLeg');
  }
}
