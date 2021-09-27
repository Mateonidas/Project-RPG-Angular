import {Model} from "../model";
import {ListModel} from "../list-model";

export class Skill extends Model {

}

export class SkillsList extends ListModel {
  public static list = [
    new Skill('Dodge', 'Unik'),
    new Skill('RangedCrossbow', 'Broń Zasięgowa (Kusze)'),
    new Skill('MeleeBasic', 'Walka Wręcz (Podstawowa)'),
    new Skill('MeleeCavalry', 'Walka Wręcz (Kawaleryjska)'),
    new Skill('MeleeFencing', 'Walka Wręcz (Szermiercza)'),
    new Skill('MeleeBrawling', 'Walka Wręcz (Bijatyka)'),
    new Skill('MeleeFlail', 'Walka Wręcz (Korbacze)'),
    new Skill('MeleeParry', 'Walka Wręcz (Parująca)'),
    new Skill('MeleePolearm', 'Walka Wręcz (Drzewcowa)'),
    new Skill('MeleeTwoHanded', 'Walka Wręcz (Dwuręczna)'),
  ]

  static get meleeBasic(): Skill {
    return <Skill>this.getListItemByName('MeleeBasic');
  }

  static get rangedCrossbow(): Skill {
    return <Skill>this.getListItemByName('RangedCrossbow');
  }
}

export class CharacterSkill {
  public skill: Skill;
  public value: number;

  constructor(skill: Skill, value: number) {
    this.skill = skill;
    this.value = value;
  }
}
