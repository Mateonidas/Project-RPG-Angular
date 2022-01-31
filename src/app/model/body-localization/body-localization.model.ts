import {Model} from "../model";
import {ListModel} from "../list-model";

export class BodyLocalization extends Model {

  constructor(name?: string, nameTranslation?: string) {
    super(name, nameTranslation);
  }

  static fromJSON(object: Object): BodyLocalization {
    return Object.assign(new BodyLocalization(), object);
  }

  static arrayFromJSON(objectsArray: Object[]): BodyLocalization[] {
    let bodyLocalizations = [];
    for (let object of objectsArray) {
      let bodyLocalization = BodyLocalization.fromJSON(object);
      bodyLocalizations.push(bodyLocalization);
    }
    return bodyLocalizations;
  }
}

export class BodyLocalizationList extends ListModel {

  public static list: BodyLocalization[] = [
    new BodyLocalization('head', 'Głowa'),
    new BodyLocalization('leftArm', 'Lewa ręka'),
    new BodyLocalization('rightArm', 'Prawa ręka'),
    new BodyLocalization('body', 'Korpus'),
    new BodyLocalization('leftLeg', 'Lewa noga'),
    new BodyLocalization('rightLeg', 'Prawa noga'),
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
