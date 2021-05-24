export class Skill {
  public name: SkillsList;
  public value: number;


  constructor(name: SkillsList, value: number) {
    this.name = name;
    this.value = value;
  }
}

export enum SkillsList {
  MeleeBasic = 'Walka Wręcz (Podstawowa)',
  MeleeCavalry = 'Walka Wręcz (Kawaleryjska)',
  MeleeFencing = 'Walka Wręcz (Szermiercza)',
  MeleeBrawling = 'Walka Wręcz (Bijatyka)',
  MeleeFlail = 'Walka Wręcz (Korbacze)',
  MeleeParry = 'Walka Wręcz (Parująca)',
  MeleePolearm = 'Walka Wręcz (Drzewcowa)',
  MeleeTwoHanded = 'Walka Wręcz (Dwuręczna)',
}
