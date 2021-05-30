export class Skill {
  public name: string;
  public nameTranslation: string;
  public value: number;


  constructor(name: string, nameTranslation: string, value: number) {
    this.name = name;
    this.nameTranslation = nameTranslation;
    this.value = value;
  }
}

export class SkillsList {
  public skillsList = [
    new Skill('MeleeBasic', 'Walka Wręcz (Podstawowa)', 0),
    new Skill('MeleeCavalry', 'Walka Wręcz (Kawaleryjska)', 0),
    new Skill('MeleeFencing', 'Walka Wręcz (Szermiercza)', 0),
    new Skill('MeleeBrawling', 'Walka Wręcz (Bijatyka)', 0),
    new Skill('MeleeFlail', 'Walka Wręcz (Korbacze)', 0),
    new Skill('MeleeParry', 'Walka Wręcz (Parująca)', 0),
    new Skill('MeleePolearm', 'Walka Wręcz (Drzewcowa)', 0),
    new Skill('MeleeTwoHanded', 'Walka Wręcz (Dwuręczna)', 0),
  ]
}
