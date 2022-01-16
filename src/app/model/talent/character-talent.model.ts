import {Talent} from "./talent.model";

export class CharacterTalent extends Talent {
  public level: number;

  constructor(name?: string, nameTranslation?: string, maxLevel?: string, level?: number) {
    super(name, nameTranslation, maxLevel)
    this.level = <number>level;
  }

  static fromJSON(object: Object): CharacterTalent {
    return Object.assign(new CharacterTalent(), object);
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterTalent[] {
    let talents = [];
    for (let object of objectsArray) {
      let talent = CharacterTalent.fromJSON(object);
      talents.push(talent);
    }
    return talents;
  }
}

export class TalentsList {
  public talentsList = [
    new CharacterTalent('Ambidextrous', 'Oburęczność',  '2', 0),
    new CharacterTalent('Battle Rage', 'Szał Bitewny',  'BSw', 0)
  ];
}
