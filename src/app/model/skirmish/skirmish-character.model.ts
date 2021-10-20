import {Character} from "../character/character.model";
import {BodyLocalization} from "../armor/body-localization.model";
import {Weapon} from "../weapon/weapon.model";
import {SkillsList} from "../skill/skill.model";
import {Characteristics} from "../characteristic/characteristic.model";
import {Condition} from "../conditions/condition.model";
import {Model} from "../model";
import {ConditionsList} from "../conditions/conditions-list.model";

export class SkirmishCharacter extends Character {

  private _roll!: number;
  private _modifier!: number;
  private _usedWeapon!: Weapon;
  private _isAttacker!: boolean;
  private _isDodging!: boolean;
  private _currentWounds!: number;
  private _skirmishInitiative!: number;
  private _advantage!: number;
  private _successLevel!: number;
  private _conditions: Condition[] = [];

  constructor(character: Character) {
    super(character.name, character.description, character.characteristics, character.skills, character.talents, character.isRightHanded, character.weapons, character.armor);
    this._currentWounds = character.characteristics.wounds.value;
    this._skirmishInitiative = character.characteristics.initiative.value;
    this._advantage = 0;
  }

  getArmorForBodyLocalization(localization: BodyLocalization) {
    let armorForLocation = this.armor.filter(armor => armor.localization.includes(localization));

    let armorPoints = 0;

    for (let armor of armorForLocation) {
      armorPoints += armor.armorPoints;
    }

    return armorPoints;
  }

  getFightTrait() {
    if (this.isAttacker) {
      return this.getTraitForWeapon();
    } else {
      if (this.isDodging) {
        return this.getTraitForDodging();
      } else {
        return this.getTraitForWeapon();
      }
    }
  }

  private getTraitForWeapon() {
    let trait = this.skills.find(characterSkill => characterSkill.base == this._usedWeapon.weaponGroup.usedSkill);
    if (trait === undefined) {
      trait = this.characteristics.getCharacteristic(this._usedWeapon.attackType.usedCharacteristic);
    }

    return trait;
  }

  private getTraitForDodging() {
    let trait = this.skills.find(characterSkill => characterSkill.base == SkillsList.dodge)
    if (trait === undefined) {
      trait = this.characteristics.getCharacteristic(Characteristics.agility)
    }

    return trait;
  }

  checkIfWeaponAdvantagesAreIgnored() {
    let skill = this.skills.find(characterSkill => characterSkill.base == this.usedWeapon.weaponGroup.usedSkill);
    return skill === undefined;
  }

  addCondition(newCondition: Model) {
    if ( this.conditions.length === 0) {
      this.conditions.push(new Condition(newCondition, 1));
    } else {
      for (let condition of this.conditions) {
        if (condition.base === newCondition) {
          if (!(condition.base === ConditionsList.prone ||
            condition.base === ConditionsList.stunned ||
            condition.base === ConditionsList.surprised))
            condition.value += 1;
        } else {
          this.conditions.push(new Condition(newCondition, 1));
        }
      }
    }
  }

  get conditions(): Condition[] {
    return this._conditions;
  }

  get roll(): number {
    return this._roll;
  }

  set roll(value: number) {
    this._roll = value;
  }

  get modifier(): number {
    return this._modifier;
  }

  set modifier(value: number) {
    this._modifier = value;
  }

  get usedWeapon(): Weapon {
    return this._usedWeapon;
  }

  set usedWeapon(value: Weapon) {
    this._usedWeapon = value;
  }

  get isAttacker(): boolean {
    return this._isAttacker;
  }

  set isAttacker(value: boolean) {
    this._isAttacker = value;
  }

  get isDodging(): boolean {
    return this._isDodging;
  }

  set isDodging(value: boolean) {
    this._isDodging = value;
  }

  get currentWounds(): number {
    return this._currentWounds;
  }

  set currentWounds(value: number) {
    this._currentWounds = value;
  }

  get skirmishInitiative(): number {
    return this._skirmishInitiative;
  }

  set skirmishInitiative(value: number) {
    this._skirmishInitiative = value;
  }

  get advantage(): number {
    return this._advantage;
  }

  set advantage(value: number) {
    this._advantage = value;
  }

  get successLevel(): number {
    return this._successLevel;
  }

  set successLevel(value: number) {
    this._successLevel = value;
  }
}
