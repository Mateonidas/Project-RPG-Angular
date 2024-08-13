import {Model} from "../model";

export class Talent extends Model {
  public maxLevel: string;

  constructor(name?: string, nameTranslation?: string, maxLevel?: string) {
    super(name, nameTranslation);
    this.maxLevel = <string>maxLevel;
  }

  static fromJSON(object: Object): Talent {
    return Object.assign(new Talent(), object);
  }

  static arrayFromJSON(objectsArray: Object[]): Talent[] {
    let talents = [];
    for (let object of objectsArray) {
      let talent = Talent.fromJSON(object);
      talents.push(talent);
    }
    return talents;
  }
}
