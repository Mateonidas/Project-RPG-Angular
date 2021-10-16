import {Character} from "../character/character.model";
import {TemporaryParameters} from "./temporary-parameters.model";
import {BodyLocalization} from "../armor/body-localization.model";
import {Weapon} from "../weapon/weapon.model";
import {SkillsList} from "../skill/skill.model";
import {Characteristics} from "../characteristic/characteristic.model";

export class SkirmishCharacter extends Character {

  public temporaryParameters: TemporaryParameters;
  private _roll!: number;
  private _modifier!: number;
  private _usedWeapon!: Weapon;
  private _isAttacker!: boolean;
  private _isDodging!: boolean

  constructor(character: Character) {
    super(character.name, character.description, character.characteristics, character.skills, character.talents, character.isRightHanded, character.weapons, character.armor);
    this.temporaryParameters = new TemporaryParameters(character.characteristics.wounds.value, character.characteristics.initiative.value);
  }

  setTemporaryParameters(temporaryParameters: TemporaryParameters) {
    this.temporaryParameters = temporaryParameters;
  }

  getSkirmishInitiative() {
    return this.temporaryParameters.skirmishInitiative;
  }

  getArmorForBodyLocalization(localization: BodyLocalization){
    let armorForLocation = this.armor.filter(armor => armor.localization.includes(localization));

    let armorPoints = 0;

    for(let armor of armorForLocation) {
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
}