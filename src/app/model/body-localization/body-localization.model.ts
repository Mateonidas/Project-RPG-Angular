import {Model} from "../model";
import {ListModel} from "../list-model";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";

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
    new BodyLocalization('HEAD', TextResourceService.getBodyLocalizationNameTranslation('HEAD').nameTranslation),
    new BodyLocalization('RIGHT_ARM',  TextResourceService.getBodyLocalizationNameTranslation('RIGHT_ARM').nameTranslation),
    new BodyLocalization('LEFT_ARM',  TextResourceService.getBodyLocalizationNameTranslation('LEFT_ARM').nameTranslation),
    new BodyLocalization('BODY',  TextResourceService.getBodyLocalizationNameTranslation('BODY').nameTranslation),
    new BodyLocalization('RIGHT_LEG',  TextResourceService.getBodyLocalizationNameTranslation('RIGHT_LEG').nameTranslation),
    new BodyLocalization('LEFT_LEG',  TextResourceService.getBodyLocalizationNameTranslation('LEFT_LEG').nameTranslation),
  ];

  static get head(){
    return <BodyLocalization>BodyLocalizationList.getListItemByName('HEAD');
  }

  static get leftArm() {
    return <BodyLocalization>BodyLocalizationList.getListItemByName('LEFT_ARM');
  }

  static get rightArm() {
    return <BodyLocalization>BodyLocalizationList.getListItemByName('RIGHT_ARM');
  }

  static get body() {
    return <BodyLocalization>BodyLocalizationList.getListItemByName('BODY');
  }

  static get leftLeg() {
    return <BodyLocalization>BodyLocalizationList.getListItemByName('LEFT_LEG');
  }

  static get rightLeg() {
    return <BodyLocalization>BodyLocalizationList.getListItemByName('RIGHT_LEG');
  }
}
