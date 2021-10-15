import {Model} from "../model";

export class Talent extends Model{
  public level: number;
  public maxLevel: string;

  constructor(name: string, nameTranslation: string, level: number, maxLevel: string) {
    super(name, nameTranslation)
    this.level = level;
    this.maxLevel = maxLevel;
  }
}

export class TalentsList {
  public talentsList = [
    new Talent('Ambidextrous', 'Oburęczność', 0, '2'),
    new Talent('Battle Rage', 'Szał Bitewny', 0, 'BSw')
  ];
}
