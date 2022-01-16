import {Model} from "../model";
import {ListModel} from "../list-model";

export class Skill extends Model {

  static fromJSON(object: Object): Skill {
    return Object.assign(new Skill(), object);
  }
}

export class SkillsList extends ListModel {
  public static list = [
    new Skill('Cool', 'Opanowanie'),
    new Skill('Dodge', 'Unik'),
    new Skill('Endurance', 'Odporność'),
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

  static get cool(): Skill {
    return <Skill>this.getListItemByName('Cool');
  }

  static get dodge(): Skill {
    return <Skill>this.getListItemByName('Dodge');
  }

  static get endurance(): Skill {
    return <Skill>this.getListItemByName('Endurance');
  }

  static get rangedCrossbow(): Skill {
    return <Skill>this.getListItemByName('RangedCrossbow');
  }

  static get meleeBasic(): Skill {
    return <Skill>this.getListItemByName('MeleeBasic');
  }

  static get meleeFencing(): Skill {
    return <Skill>this.getListItemByName('MeleeFencing');
  }
}

