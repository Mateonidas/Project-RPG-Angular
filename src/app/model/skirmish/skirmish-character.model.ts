import {Character} from "../character/character.model";
import {BodyLocalization, BodyLocalizationList} from "../body-localization/body-localization.model";
import {Weapon} from "../weapon/weapon.model";
import {Skill, SkillsList} from "../skill/skill.model";
import {Characteristics} from "../characteristic/characteristic.model";
import {Condition} from "../conditions/condition.model";
import {Model} from "../model";
import {ConditionsList} from "../conditions/conditions-list.model";
import {RollService} from "../../shared/services/roll-service/roll.service";
import {Roll} from "../roll/roll.model";
import {CharacterBodyLocalizations} from "../body-localization/character-body-localizations.model";

export class SkirmishCharacter extends Character {

  private _roll!: Roll;
  private _usedWeapon!: Weapon;
  private _isAttacker!: boolean;
  private _isDodging!: boolean;
  private _currentWounds!: number;
  private _skirmishInitiative!: number;
  private _advantage!: number;
  private _conditions!: Condition[];
  private _bodyLocalizations!: CharacterBodyLocalizations;
  private _isDead!: boolean;
  private _isEngaged!: boolean;
  private _isFlanked!: boolean;
  private _unconsciousCounter!: number;
  private _notes!: string[];

  constructor(character: Character) {
    super(character.name, character.description, character.characteristics, character.skills, character.talents, character.isRightHanded, character.weapons, character.armor);
    this._currentWounds = character.characteristics.wounds.value;
    this._skirmishInitiative = character.characteristics.initiative.value;
    this._advantage = 0;
    this._roll = new Roll();
    this.conditions = [];
    this.fillLocalizationArmorPoints();
    this._isDead = false;
    this._isEngaged = false;
    this.resetUnconsciousCounter();
    this._notes = [];
  }

  private fillLocalizationArmorPoints() {
    this.bodyLocalizations = new CharacterBodyLocalizations();
    this._bodyLocalizations.head.armorPoints = this.getArmorForLocalization(BodyLocalizationList.head);
    this._bodyLocalizations.leftArm.armorPoints = this.getArmorForLocalization(BodyLocalizationList.leftArm);
    this._bodyLocalizations.rightArm.armorPoints = this.getArmorForLocalization(BodyLocalizationList.rightArm);
    this._bodyLocalizations.body.armorPoints = this.getArmorForLocalization(BodyLocalizationList.body);
    this._bodyLocalizations.leftLeg.armorPoints  = this.getArmorForLocalization(BodyLocalizationList.leftLeg);
    this._bodyLocalizations.rightLeg.armorPoints  = this.getArmorForLocalization(BodyLocalizationList.rightLeg);
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
      this._bodyLocalizations.head.armorPoints,
      this._bodyLocalizations.leftArm.armorPoints,
      this._bodyLocalizations.rightArm.armorPoints,
      this._bodyLocalizations.body.armorPoints,
      this._bodyLocalizations.leftLeg.armorPoints,
      this._bodyLocalizations.rightLeg.armorPoints
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

  resetUnconsciousCounter() {
    this.unconsciousCounter = RollService.calculateTraitBonus(this.characteristics.toughness.value);
  }

  addCondition(newCondition: Model) {
    if (this.conditions.length === 0) {
      this.conditions.push(new Condition(newCondition, 1));
    } else {
      let found = false;
      for (let condition of this.conditions) {
        if (condition.base === newCondition) {
          found = true;
          if (!(condition.base === ConditionsList.prone ||
            condition.base === ConditionsList.unconscious ||
            condition.base === ConditionsList.surprised)) {
            condition.value += 1;
          }
        }
      }
      if (!found) {
        this.conditions.push(new Condition(newCondition, 1));
      }
    }
  }

  removeCondition(condition: Model) {
    let index = this.conditions.findIndex(c => c.base === condition);
    this.conditions.splice(index, 1);
  }

  addNote(note: string) {
    this._notes.push(note);
  }

  get notes(): string[] {
    return this._notes;
  }

  set notes(value: string[]) {
    this._notes = value;
  }

  get conditions(): Condition[] {
    return this._conditions;
  }

  set conditions(value: Condition[]) {
    this._conditions = value;
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

  get unconsciousCounter(): number {
    return this._unconsciousCounter;
  }

  set unconsciousCounter(value: number) {
    this._unconsciousCounter = value;
  }

  get roll(): Roll {
    return this._roll;
  }

  set roll(value: Roll) {
    this._roll = value;
  }

  get bodyLocalizations(): CharacterBodyLocalizations {
    return this._bodyLocalizations;
  }

  set bodyLocalizations(value: CharacterBodyLocalizations) {
    this._bodyLocalizations = value;
  }

}
