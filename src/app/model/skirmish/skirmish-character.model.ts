import {Character} from "../character/character.model";
import {BodyLocalization, BodyLocalizationList} from "../body-localization/body-localization.model";
import {Weapon} from "../weapon/weapon.model";
import {CharacterSkill, Skill, SkillsList} from "../skill/skill.model";
import {Characteristics} from "../characteristic/characteristic.model";
import {Condition} from "../conditions/condition.model";
import {Model} from "../model";
import {ConditionsList} from "../conditions/conditions-list.model";
import {RollService} from "../../shared/services/roll-service/roll.service";
import {Roll} from "../roll/roll.model";
import {CharacterBodyLocalizations} from "../body-localization/character-body-localizations.model";
import {CharacterCharacteristics} from "../characteristic/character-characteristic.model";
import {Talent} from "../talent/talent.model";
import {Armor} from "../armor/armor.model";
import {CriticalWound} from "../critical-wounds/critical-wounds.model";
import {Injury} from "../injures/injures-list.model";

export class SkirmishCharacter extends Character {

  id!: number;
  roll!: Roll;
  usedWeapon!: Weapon;
  isAttacker!: boolean;
  isDodging!: boolean;
  currentWounds!: number;
  skirmishInitiative!: number;
  advantage!: number;
  conditions!: Condition[];
  injuries!: Injury[];
  criticalWounds!: CriticalWound[];
  bodyLocalizations!: CharacterBodyLocalizations;
  isDead!: boolean;
  isEngaged!: boolean;
  isFlanked!: boolean;
  unconsciousCounter!: number;
  notes!: string[];

  constructor(character?: Character, id?: number) {
    super(character?.name, character?.description, character?.characteristics, character?.skills, character?.talents, character?.isRightHanded, character?.weapons, character?.armor);
    if (character != undefined) {
      this.id = <number>id;
      this.currentWounds = <number>character?.characteristics.wounds.value;
      this.skirmishInitiative = <number>character?.characteristics.initiative.value;
      this.advantage = 0;
      this.roll = new Roll();
      this.conditions = [];
      this.injuries = [];
      this.criticalWounds = [];
      this.fillLocalizationArmorPoints();
      this.isDead = false;
      this.isEngaged = false;
      this.resetUnconsciousCounter();
      this.notes = [];
    }
  }

  private fillLocalizationArmorPoints() {
    this.bodyLocalizations = new CharacterBodyLocalizations();
    this.bodyLocalizations.head.armorPoints = this.getArmorForLocalization(BodyLocalizationList.head);
    this.bodyLocalizations.leftArm.armorPoints = this.getArmorForLocalization(BodyLocalizationList.leftArm);
    this.bodyLocalizations.rightArm.armorPoints = this.getArmorForLocalization(BodyLocalizationList.rightArm);
    this.bodyLocalizations.body.armorPoints = this.getArmorForLocalization(BodyLocalizationList.body);
    this.bodyLocalizations.leftLeg.armorPoints = this.getArmorForLocalization(BodyLocalizationList.leftLeg);
    this.bodyLocalizations.rightLeg.armorPoints = this.getArmorForLocalization(BodyLocalizationList.rightLeg);
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
      this.bodyLocalizations.head.armorPoints,
      this.bodyLocalizations.leftArm.armorPoints,
      this.bodyLocalizations.rightArm.armorPoints,
      this.bodyLocalizations.body.armorPoints,
      this.bodyLocalizations.leftLeg.armorPoints,
      this.bodyLocalizations.rightLeg.armorPoints
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
    let trait = this.skills.find(characterSkill => characterSkill.base.nameTranslation == this.usedWeapon.weaponGroup.usedSkill.nameTranslation);
    if (trait === undefined) {
      trait = this.characteristics.getCharacteristic(this.usedWeapon.attackType.usedCharacteristic);
    }

    return trait;
  }

  private getTraitForDodging() {
    let trait = this.skills.find(characterSkill => characterSkill.base.nameTranslation == SkillsList.dodge.nameTranslation)
    if (trait === undefined) {
      trait = this.characteristics.getCharacteristic(Characteristics.agility)
    }

    return trait;
  }

  getSkill(skill: Skill) {
    return this.skills.filter(s => s.base === skill)[0];
  }

  checkIfWeaponAdvantagesAreIgnored() {
    let skill = this.skills.find(characterSkill => characterSkill.base.nameTranslation == this.usedWeapon.weaponGroup.usedSkill.nameTranslation);
    return skill === undefined;
  }

  checkIfHasCondition(condition: Model) {
    return this.conditions.filter(e => e.base.nameTranslation === condition.nameTranslation).length > 0;
  }

  getCondition(condition: Model) {
    return this.conditions.filter(e => e.base.nameTranslation === condition.nameTranslation)[0];
  }

  resetUnconsciousCounter() {
    this.unconsciousCounter = RollService.calculateTraitBonus(this.characteristics.toughness.value);
  }

  addCondition(newCondition: Model, level?: number, incurableValue?: number) {
    if (this.conditions.length === 0) {
      this.conditions.push(new Condition(newCondition, level, incurableValue));
    } else {
      let found = false;
      for (let condition of this.conditions) {
        if (condition.base.nameTranslation === newCondition.nameTranslation) {
          found = true;
          if (!(condition.base.nameTranslation === ConditionsList.prone.nameTranslation ||
            condition.base.nameTranslation === ConditionsList.unconscious.nameTranslation ||
            condition.base.nameTranslation === ConditionsList.surprised.nameTranslation)) {
            if (level != undefined) {
              condition.value += level;
            } else {
              condition.value += 1;
            }
            if (incurableValue != undefined) {
              condition.incurableValue += incurableValue;
            }
          }
        }
      }
      if (!found) {
        this.conditions.push(new Condition(newCondition, level));
      }
    }
    this.advantage = 0;
  }

  removeCondition(condition: Model) {
    let index = this.conditions.findIndex(c => c.base.name === condition.name);
    this.conditions.splice(index, 1);
  }

  addNote(note: string) {
    this.notes.push(note);
  }

  addInjure(injure: Injury) {
    this.injuries.push(injure);
  }

  removeInjure(injure: Injury) {
    let index = this.injuries.indexOf(injure);
    this.injuries.splice(index, 1);
  }

  getCriticalWound(criticalWound: CriticalWound) {
    return this.criticalWounds.filter(w => w.name === criticalWound.name)[0];
  }

  addCriticalWound(criticalWound: CriticalWound) {
    this.criticalWounds.push(criticalWound);
  }

  removeCriticalWound(criticalWound: CriticalWound) {
    let index = this.criticalWounds.indexOf(criticalWound);
    this.criticalWounds.splice(index, 1);
  }

  static fromJSON(object: Object): SkirmishCharacter {
    let character = Object.assign(new SkirmishCharacter(), object);
    character.roll = Roll.fromJSON(character['roll']);
    character.characteristics = CharacterCharacteristics.fromJSON(character['characteristics']);
    character.skills = CharacterSkill.arrayFromJSON(character["skills"]);
    character.talents = Talent.arrayFromJSON(character["talents"]);
    character.weapons = Weapon.arrayFromJSON(character['weapons']);
    character.armor = Armor.arrayFromJSON(character['armor']);
    character.conditions = Condition.arrayFromJSON(character['conditions'])
    character.injuries = Injury.arrayFromJSON(character['injuries'])
    character.criticalWounds = CriticalWound.arrayFromJSON(character['criticalWounds']);
    character.bodyLocalizations = CharacterBodyLocalizations.fromJSON(character['bodyLocalizations']);
    return character;
  }

  static arrayFromJSON(objectsArray: Object[]): SkirmishCharacter[] {
    let skirmishCharacters = [];
    for (let object of objectsArray) {
      let character = SkirmishCharacter.fromJSON(object);
      skirmishCharacters.push(character);
    }
    return skirmishCharacters;
  }
}
