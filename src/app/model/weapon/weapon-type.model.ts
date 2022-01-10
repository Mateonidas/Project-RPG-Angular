import {ListModel} from "../list-model";
import {Skill, SkillsList} from "../skill/skill.model";
import {Model} from "../model";
import {Characteristic} from "../characteristic/characteristic.model";

export class WeaponGroupType extends Model {
  public usedSkill: Skill;

  constructor(name?: string, nameTranslation?: string, usedSkill?: Skill) {
    super(name, nameTranslation);
    this.usedSkill = <Skill>usedSkill;
  }

  static fromJSON(object: Object): WeaponGroupType {
    let weaponGroup = Object.assign(new WeaponGroupType(), object);
    weaponGroup.usedSkill = Characteristic.fromJSON(weaponGroup['usedSkill']);
    return weaponGroup;
  }
}

export class WeaponGroupsList extends ListModel {
  public static list = [
    new WeaponGroupType('Basic', 'Podstawowa', SkillsList.meleeBasic),
    new WeaponGroupType('Fencing', 'Szermiercza', SkillsList.meleeFencing),
    new WeaponGroupType('Crossbow', 'Kusze', SkillsList.rangedCrossbow),
  ]

  static get basic() {
    return <WeaponGroupType>this.getListItemByName('Basic');
  }

  static get fencing() {
    return <WeaponGroupType>this.getListItemByName('Fencing');
  }

  static get crossbow() {
    return <WeaponGroupType>this.getListItemByName('Crossbow');
  }
}
