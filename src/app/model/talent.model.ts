export class Talent {
  public name: string;
  public nameTranslation: string;
  public level: number;
  public maxLevel: number;

  constructor(name: string, nameTranslation: string, level: number, maxLevel: number) {
    this.name = name;
    this.nameTranslation = nameTranslation;
    this.level = level;
    this.maxLevel = maxLevel;
  }
}

export class TalentsList {
  Ambidextrous = new Talent('Ambidextrous' ,'Oburęczność', 0,2);
    // 'Oburęczność',
  // BattleRage = 'Szał Bitewny'
}
