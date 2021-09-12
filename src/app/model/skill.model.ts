import {Model} from "./model";

export class Skill extends Model{
  public value: number;

  constructor(name: string, nameTranslation: string, value: number) {
    super(name, nameTranslation);
    this.value = value;
  }
}

export class SkillsList {
  public skillsList = [
    new Skill('Dodge', 'Unik', 0),
    new Skill('MeleeBasic', 'Walka Wręcz (Podstawowa)', 0),
    new Skill('MeleeCavalry', 'Walka Wręcz (Kawaleryjska)', 0),
    new Skill('MeleeFencing', 'Walka Wręcz (Szermiercza)', 0),
    new Skill('MeleeBrawling', 'Walka Wręcz (Bijatyka)', 0),
    new Skill('MeleeFlail', 'Walka Wręcz (Korbacze)', 0),
    new Skill('MeleeParry', 'Walka Wręcz (Parująca)', 0),
    new Skill('MeleePolearm', 'Walka Wręcz (Drzewcowa)', 0),
    new Skill('MeleeTwoHanded', 'Walka Wręcz (Dwuręczna)', 0),
  ]

  private getSkillByName(name: string): Skill {
    return <Skill>this.skillsList.find(x => x.name == name);
  }
}
