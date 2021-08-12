import {Model} from "./model";

export class BodyLocalization extends Model {
  public numericalInterval?: number[];

  constructor(name: string, nameTranslation: string, numericalInterval: number[]) {
    super(name, nameTranslation);
    this.numericalInterval = numericalInterval;
  }
}

// export class BodyLocalizationGroup extends Model{
//   public localizations: BodyLocalization[];
//
//   constructor(name: string, nameTranslation: string, localizations: BodyLocalization[]) {
//     super(name, nameTranslation);
//     this.localizations = localizations;
//   }
// }

export class BodyLocalizationList {
  public static head = new BodyLocalization('head', 'Głowa', [1, 9]);
  public static body = new BodyLocalization('body', 'Korpus', [1, 9]);
  public static arms = new BodyLocalization('arms', 'Ramiona', [1, 9]);
  public static legs = new BodyLocalization('legs', 'Nogi', [1, 9]);

  // public static leftArm = new BodyLocalization('leftArm', 'Lewe ramię', [1,9]);
  // public static rightArm = new BodyLocalization('rightArm', 'Prawe ramię', [1,9]);
  // public static leftLeg = new BodyLocalization('leftLeg', 'Lewa noga', [1,9]);
  // public static rightLeg = new BodyLocalization('rightLeg', 'Prawa noga', [1,9]);
  // public static head = new BodyLocalizationGroup('head', 'Głowa',
  //   [new BodyLocalization('head', 'Głowa', [1,9])]);
}
