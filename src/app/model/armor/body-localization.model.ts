import {Model} from "../model";

export class BodyLocalization extends Model {
  public numericalInterval?: number[];

  constructor(name: string, nameTranslation: string, numericalInterval: number[]) {
    super(name, nameTranslation);
    this.numericalInterval = numericalInterval;
  }
}

export class BodyLocalizationList {
  public static head = new BodyLocalization('head', 'Głowa', [1, 9]);
  public static leftArm = new BodyLocalization('leftArm', 'Lewa ręka', [10, 24]);
  public static rightArm = new BodyLocalization('rightArm', 'Prawa ręka', [25, 44]);
  public static body = new BodyLocalization('body', 'Korpus', [45, 79]);
  public static leftLeg = new BodyLocalization('leftLeg', 'Lewa noga', [80, 89]);
  public static rightLeg = new BodyLocalization('rightLeg', 'Prawa noga', [90, 100]);
}
