import {Character} from "../character/character.model";
import {BodyLocalization, BodyLocalizationList} from "../body-localization/body-localization.model";
import {Weapon} from "../weapon/weapon.model";
import {Skill} from "../skill/skill.model";
import {Condition} from "../conditions/condition.model";
import {Roll} from "../roll/roll.model";
import {CharacterBodyLocalizations} from "../body-localization/character-body-localizations.model";
import {CharacterCharacteristic} from "../characteristic/character-characteristic.model";
import {CharacterTalent} from "../talent/character-talent.model";
import {Armor} from "../armor/armor.model";
import {CriticalWound} from "../critical-wounds/critical-wounds.model";
import {InjuryOld} from "../injures/injures-list.model";
import {CharacterSkill} from "../skill/character-skill.model";
import {CharacterWeapon} from "../weapon/character-weapon.model";
import {CharacterBodyLocalization} from "../body-localization/character-body-localization.model";

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
  injuries!: InjuryOld[];
  criticalWounds!: CriticalWound[];
  bodyLocalizations!: CharacterBodyLocalization[];
  skirmishBodyLocalizations!: CharacterBodyLocalizations;
  isDead!: boolean;
  isEngaged!: boolean;
  isFlanked!: boolean;
  unconsciousCounter!: number;
  notes!: string[];

  constructor(character?: Character, id?: number) {
    super(character?.name, character?.description, character?.characteristics, character?.skills, character?.talents, character?.isRightHanded, character?.weapons, character?.armors);
    if (character != undefined) {
      this.id = <number>id;
      this.currentWounds = <number>character?.wounds.value;
      this.skirmishInitiative = <number>character?.initiative.value;
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
    this.skirmishBodyLocalizations = new CharacterBodyLocalizations();
    this.skirmishBodyLocalizations.head.armorPoints = this.getArmorForLocalization(BodyLocalizationList.head);
    this.skirmishBodyLocalizations.leftArm.armorPoints = this.getArmorForLocalization(BodyLocalizationList.leftArm);
    this.skirmishBodyLocalizations.rightArm.armorPoints = this.getArmorForLocalization(BodyLocalizationList.rightArm);
    this.skirmishBodyLocalizations.body.armorPoints = this.getArmorForLocalization(BodyLocalizationList.body);
    this.skirmishBodyLocalizations.leftLeg.armorPoints = this.getArmorForLocalization(BodyLocalizationList.leftLeg);
    this.skirmishBodyLocalizations.rightLeg.armorPoints = this.getArmorForLocalization(BodyLocalizationList.rightLeg);
  }

  private getArmorForLocalization(localization: BodyLocalization) {
    let characterBodyLocalizations = this.bodyLocalizations.filter(bodyLocalization => bodyLocalization.bodyLocalization.name === localization.name);

    let armorPoints = 0;

    for (let characterBodyLocalization of characterBodyLocalizations) {
      armorPoints += characterBodyLocalization.armorPoints;
    }

    return armorPoints;
  }

  // getArmorFromLessArmoredLocalization() {
  //   return Math.min(
  //     this.bodyLocalizations.head.armorPoints,
  //     this.bodyLocalizations.leftArm.armorPoints,
  //     this.bodyLocalizations.rightArm.armorPoints,
  //     this.bodyLocalizations.body.armorPoints,
  //     this.bodyLocalizations.leftLeg.armorPoints,
  //     this.bodyLocalizations.rightLeg.armorPoints
  //   )
  // }

  // getFightTrait() {
  //   if (this.isAttacker) {
  //     return this.getTraitForWeapon();
  //   } else {
  //     if (this.isDodging) {
  //       return this.getTraitForDodging();
  //     } else {
  //       return this.getTraitForWeapon();
  //     }
  //   }
  // }

  // private getTraitForWeapon() {
  //   let trait = this.skills.find(characterSkill => characterSkill.base.nameTranslation == this.usedWeapon.weaponGroupType.usedSkill.nameTranslation);
  //   if (trait === undefined) {
  //     trait = this.characteristics.getCharacteristic(this.usedWeapon.weaponType.usedCharacteristic);
  //   }
  //
  //   return trait;
  // }

  // private getTraitForDodging() {
  //   let trait = this.skills.find(characterSkill => characterSkill.base.nameTranslation == SkillsList.dodge.nameTranslation)
  //   if (trait === undefined) {
  //     trait = this.characteristics.getCharacteristic(Characteristics.agility)
  //   }
  //
  //   return trait;
  // }

  getSkill(skill: Skill) {
    return this.skills.filter(s => s.skill === skill)[0];
  }

  // checkIfWeaponAdvantagesAreIgnored() {
  //   let skill = this.skills.find(characterSkill => characterSkill.base.nameTranslation == this.usedWeapon.weaponGroupType.usedSkill.nameTranslation);
  //   return skill === undefined;
  // }

  // checkIfHasCondition(condition: Model) {
  //   return this.conditions.filter(e => e.base.nameTranslation === condition.nameTranslation).length > 0;
  // }
  //
  // getCondition(condition: Model) {
  //   return this.conditions.filter(e => e.base.nameTranslation === condition.nameTranslation)[0];
  // }

  resetUnconsciousCounter() {
    // this.unconsciousCounter = RollService.calculateTraitBonus(this.characteristics.toughness.value);
  }

  // addCondition(newCondition: Model, level?: number, incurableValue?: number) {
  //   if (this.conditions.length === 0) {
  //     this.conditions.push(new Condition(newCondition, level, incurableValue));
  //   } else {
  //     let found = false;
  //     for (let condition of this.conditions) {
  //       if (condition.base.nameTranslation === newCondition.nameTranslation) {
  //         found = true;
  //         if (!(condition.base.nameTranslation === ConditionsList.prone.nameTranslation ||
  //           condition.base.nameTranslation === ConditionsList.unconscious.nameTranslation ||
  //           condition.base.nameTranslation === ConditionsList.surprised.nameTranslation)) {
  //           if (level != undefined) {
  //             condition.value += level;
  //           } else {
  //             condition.value += 1;
  //           }
  //           if (incurableValue != undefined) {
  //             condition.incurableValue += incurableValue;
  //           }
  //         }
  //       }
  //     }
  //     if (!found) {
  //       this.conditions.push(new Condition(newCondition, level));
  //     }
  //   }
  //   this.advantage = 0;
  // }
  //
  // removeCondition(condition: Model) {
  //   let index = this.conditions.findIndex(c => c.base.name === condition.name);
  //   this.conditions.splice(index, 1);
  // }

  addNote(note: string) {
    this.notes.push(note);
  }

  // addInjure(injure: Injury) {
  //   this.injuries.push(injure);
  // }
  //
  // removeInjure(injure: Injury) {
  //   let index = this.injuries.indexOf(injure);
  //   this.injuries.splice(index, 1);
  // }
  //
  // getCriticalWound(criticalWound: CriticalWound) {
  //   return this.criticalWounds.filter(w => w.name === criticalWound.name)[0];
  // }
  //
  // addCriticalWound(criticalWound: CriticalWound) {
  //   this.criticalWounds.push(criticalWound);
  // }

  removeCriticalWound(criticalWound: CriticalWound) {
    let index = this.criticalWounds.indexOf(criticalWound);
    this.criticalWounds.splice(index, 1);
  }

  static fromJSON(object: Object): SkirmishCharacter {
    let character = Object.assign(new SkirmishCharacter(), object);
    character.roll = Roll.fromJSON(character['roll']);
    character.characteristics = CharacterCharacteristic.arrayFromJSON(character['characteristics']);
    character.skills = CharacterSkill.arrayFromJSON(character['skills']);
    character.talents = CharacterTalent.arrayFromJSON(character['talents']);
    character.weapons = CharacterWeapon.arrayFromJSON(character['weapons']);
    character.armors = Armor.arrayFromJSON(character['armors']);
    character.conditions = Condition.arrayFromJSON(character['conditions'])
    character.injuries = InjuryOld.arrayFromJSON(character['injuries'])
    character.criticalWounds = CriticalWound.arrayFromJSON(character['criticalWounds']);
    character.skirmishBodyLocalizations = CharacterBodyLocalizations.fromJSON(character['bodyLocalizations']);
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
