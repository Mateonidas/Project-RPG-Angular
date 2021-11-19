import {Model} from "../model";

export class Talent extends Model {
  public level: number;
  public maxLevel: string;

  constructor(name?: string, nameTranslation?: string, level?: number, maxLevel?: string) {
    super(name, nameTranslation)
    this.level = <number>level;
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

export class TalentsList {
  public talentsList = [
    new Talent('Ambidextrous', 'Oburęczność', 0, '2'),
    new Talent('Battle Rage', 'Szał Bitewny', 0, 'BSw')
  ];
}
