import {Character} from "../character/character.model";
import {CharacterCharacteristic} from "../characteristic/character-characteristic.model";
import {CharacterTalent} from "../talent/character-talent.model";
import {Armor} from "../armor/armor.model";
import {CharacterSkill} from "../skill/character-skill.model";
import {CharacterWeapon} from "../weapon/character-weapon.model";
import {CharacterBodyLocalization} from "../body-localization/character-body-localization.model";
import {CharacterCondition} from "../condition/character-condition.model";
import {CharacterTrait} from "../trait/character-trait.model";
import {Spell} from "../spell/spell.model";

export class SkirmishCharacter extends Character {

  currentWounds!: number;
  skirmishInitiative!: number;
  advantage!: number;
  isDead!: boolean;

  constructor(character?: Character, id?: number) {
    super(character?.name, character?.description, character?.group, character?.characteristics, character?.skills, character?.talents, character?.traits, character?.isRightHanded, character?.weapons, character?.armors, character?.conditions, character?.notes, character?.spells, character?.bodyLocalizations);
    if (character != undefined) {
      this.id = <number>id
      this.currentWounds = <number>character?.wounds.value
      this.skirmishInitiative = <number>character?.initiative.value
      this.advantage = 0
      this.isDead = false
      this.clearIds(character)
    }
  }

  private clearIds(character: Character) {
    character.characteristics.forEach(value => value.id = 0)
    character.bodyLocalizations.forEach(value => value.id = 0)
    character.skills.forEach(value => value.id = 0)
    character.talents.forEach(value => value.id = 0)
    character.traits.forEach(value => value.id = 0)
    character.weapons.forEach(value => value.id = 0)
    character.conditions.forEach(value => value.id = 0)
  }

  static fromJSON(object: Object): SkirmishCharacter {
    let character = Object.assign(new SkirmishCharacter(), object);
    character.characteristics = CharacterCharacteristic.arrayFromJSON(character['characteristics']);
    character.skills = CharacterSkill.arrayFromJSON(character['skills']);
    character.talents = CharacterTalent.arrayFromJSON(character['talents']);
    character.traits = CharacterTrait.arrayFromJSON(character["traits"]);
    character.weapons = CharacterWeapon.arrayFromJSON(character['weapons']);
    character.armors = Armor.arrayFromJSON(character['armors']);
    character.bodyLocalizations = CharacterBodyLocalization.arrayFromJSON(character['bodyLocalizations']);
    character.conditions = CharacterCondition.arrayFromJSON(character['conditions']);
    character.spells = Spell.arrayFromJSON(character['spells']);
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
