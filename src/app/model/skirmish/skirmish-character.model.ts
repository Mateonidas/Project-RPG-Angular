import {Character} from "../character/character.model";
import {BodyLocalization, BodyLocalizationList} from "../armor/body-localization.model";
import {Weapon} from "../weapon/weapon.model";
import {Skill, SkillsList} from "../skill/skill.model";
import {Characteristics} from "../characteristic/characteristic.model";
import {Condition} from "../conditions/condition.model";
import {Model} from "../model";
import {ConditionsList} from "../conditions/conditions-list.model";
import {ArmorBodyLocalization} from "../armor/armor-body-localization.model";

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
  private _conditions!: Condition[];
  private _armorBodyLocalization!: ArmorBodyLocalization;
  private _isDead!: boolean;
  private _isEngaged!: boolean;
  private _isFlanked!: boolean;

  constructor(character: Character) {
    super(character.name, character.description, character.characteristics, character.skills, character.talents, character.isRightHanded, character.weapons, character.armor);
    this._currentWounds = character.characteristics.wounds.value;
    this._skirmishInitiative = character.characteristics.initiative.value;
    this._advantage = 0;
    this.conditions = [];
    this.fillLocalizationArmorPoints();
    this._isDead = false;
    this._isEngaged = false;
  }

  private fillLocalizationArmorPoints() {
    this._armorBodyLocalization = new ArmorBodyLocalization();
    this._armorBodyLocalization.headArmor = this.getArmorForLocalization(BodyLocalizationList.head);
    this._armorBodyLocalization.leftArmArmor = this.getArmorForLocalization(BodyLocalizationList.leftArm);
    this._armorBodyLocalization.rightArmArmor = this.getArmorForLocalization(BodyLocalizationList.rightArm);
    this._armorBodyLocalization.bodyArmor = this.getArmorForLocalization(BodyLocalizationList.body);
    this._armorBodyLocalization.leftLegArmor = this.getArmorForLocalization(BodyLocalizationList.leftLeg);
    this._armorBodyLocalization.rightLegArmor = this.getArmorForLocalization(BodyLocalizationList.rightLeg);
  }

  private getArmorForLocalization(localization: BodyLocalization) {
    let armorForLocation = this.armor.filter(armor => armor.localization.includes(localization));

    let armorPoints = 0;

    for (let armor of armorForLocation) {
      armorPoints += armor.armorPoints;
    }

    return armorPoints;
  }

  getArmorFromLessArmoredLocalization() {
    return Math.min(
      this._armorBodyLocalization.headArmor,
      this._armorBodyLocalization.leftArmArmor,
      this._armorBodyLocalization.rightArmArmor,
      this._armorBodyLocalization.bodyArmor,
      this._armorBodyLocalization.leftLegArmor,
      this._armorBodyLocalization.rightLegArmor
    )
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

  getSkill(skill: Skill) {
    return this.skills.filter(s => s.base === skill)[0];
  }

  checkIfWeaponAdvantagesAreIgnored() {
    let skill = this.skills.find(characterSkill => characterSkill.base == this.usedWeapon.weaponGroup.usedSkill);
    return skill === undefined;
  }

  checkIfHasCondition(condition: Model) {
    return this.conditions.filter(e => e.base === condition).length > 0;
  }

  addCondition(newCondition: Model) {
    if (this.conditions.length === 0) {
      this.conditions.push(new Condition(newCondition, 1));
    } else {
      for (let condition of this.conditions) {
        if (condition.base === newCondition) {
          if (!(condition.base === ConditionsList.prone ||
            condition.base === ConditionsList.unconscious ||
            condition.base === ConditionsList.surprised))
            condition.value += 1;
        } else {
          this.conditions.push(new Condition(newCondition, 1));
        }
      }
    }
  }

  clearConditionsWithZeroValue() {
    for(let condition of this.conditions) {
      if(condition.value === 0) {
        this.removeCondition(condition.base);
      }
    }
  }

  removeCondition(condition: Model) {
    let index = this.conditions.findIndex(c => c.base === condition);
    this.conditions.splice(index, 1);
  }

  get conditions(): Condition[] {
    return this._conditions;
  }

  set conditions(value: Condition[]) {
    this._conditions = value;
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

  get armorBodyLocalization(): ArmorBodyLocalization {
    return this._armorBodyLocalization;
  }

  set armorBodyLocalization(value: ArmorBodyLocalization) {
    this._armorBodyLocalization = value;
  }

  get isDead(): boolean {
    return this._isDead;
  }

  set isDead(value: boolean) {
    this._isDead = value;
  }

  get isEngaged(): boolean {
    return this._isEngaged;
  }

  set isEngaged(value: boolean) {
    this._isEngaged = value;
  }

  get isFlanked(): boolean {
    return this._isFlanked;
  }

  set isFlanked(value: boolean) {
    this._isFlanked = value;
  }
}
