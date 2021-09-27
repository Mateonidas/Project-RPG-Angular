import {ListModel} from "../list-model";
import {Skill, SkillsList} from "../skill/skill.model";
import {Model} from "../model";

export class WeaponGroup extends Model {
  public usedSkill: Skill;

  constructor(name: string, nameTranslation: string, usedSkill: Skill) {
    super(name, nameTranslation);
    this.usedSkill = usedSkill;
  }
}

export class WeaponGroupsList extends ListModel {
  public static list = [
    new WeaponGroup('Basic', 'Podstawowa', SkillsList.meleeBasic),
    new WeaponGroup('Crossbow', 'Kusze', SkillsList.rangedCrossbow),
  ]

  static get basic() {
    return <WeaponGroup>this.getListItemByName('Basic');
  }

  static get crossbow() {
    return <WeaponGroup>this.getListItemByName('Crossbow');
  }
}
