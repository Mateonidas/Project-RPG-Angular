export class Talent {
  public name: string;
  public level: number;
  public maxLevel: number;

  constructor(name: string, level: number, maxLevel: number) {
    this.name = name;
    this.level = level;
    this.maxLevel = maxLevel;
  }
}

export class TalentsList {
  Ambidextrous = new Talent('Oburęczność', 0,2);
    // 'Oburęczność',
  // BattleRage = 'Szał Bitewny'
}
