import {CharacterTalent} from "../talent/character-talent.model";
import {Armor} from "../armor/armor.model";
import {CharacterCharacteristic} from "../characteristic/character-characteristic.model";
import {CharacterSkill} from "../skill/character-skill.model";
import {CharacterWeapon} from "../weapon/character-weapon.model";
import {CharacterBodyLocalization} from "../body-localization/character-body-localization.model";
import {CharacterCondition} from "../condition/condition.model";

export class Character {
  id!: number;
  name!: string;
  description!: string;
  characteristics!: CharacterCharacteristic[];
  skills!: CharacterSkill[];
  talents!: CharacterTalent[];
  isRightHanded!: boolean;
  weapons!: CharacterWeapon[];
  armors!: Armor[];
  bodyLocalizations!: CharacterBodyLocalization[];
  conditions!: CharacterCondition[];
  notes!: string[];

  constructor(name?: string, description?: string, characteristics?: CharacterCharacteristic[], skills?: CharacterSkill[], talents?: CharacterTalent[], rightHanded?: boolean, weapons?: CharacterWeapon[], armor?: Armor[], conditions?: CharacterCondition[], notes?: string[], bodyLocalizations?: CharacterBodyLocalization[]) {
    this.name = <string>name;
    this.description = <string>description;
    this.characteristics = <CharacterCharacteristic[]>characteristics;
    this.skills = <CharacterSkill[]>skills;
    this.talents = <CharacterTalent[]>talents;
    this.isRightHanded = <boolean>rightHanded;
    this.weapons = <CharacterWeapon[]>weapons;
    this.armors = <Armor[]>armor;
    this.bodyLocalizations = <CharacterBodyLocalization[]>bodyLocalizations;
    this.conditions = <CharacterCondition[]>conditions;
    this.notes = <string[]>notes;
  }

  get movement(): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == 'MOVEMENT');
  }

  get weaponSkill(): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == 'WEAPON_SKILL');
  }

  get ballisticSkill(): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == 'BALLISTIC_SKILL');
  }

  get strength(): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == 'STRENGTH');
  }

  get toughness(): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == 'TOUGHNESS');
  }

  get initiative(): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == 'INITIATIVE');
  }

  get agility(): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == 'AGILITY');
  }

  get dexterity(): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == 'DEXTERITY');
  }

  get intelligence(): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == 'INTELLIGENCE');
  }

  get willpower(): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == 'WILLPOWER');
  }

  get fellowship(): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == 'FELLOWSHIP');
  }

  get wounds(): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == 'WOUNDS');
  }

  static fromJSON(object: Object): Character {
    let character = Object.assign(new Character(), object);
    character.characteristics = CharacterCharacteristic.arrayFromJSON(character['characteristics']);
    character.skills = CharacterSkill.arrayFromJSON(character["skills"]);
    character.talents = CharacterTalent.arrayFromJSON(character["talents"]);
    character.weapons = CharacterWeapon.arrayFromJSON(character['weapons']);
    character.armors = Armor.arrayFromJSON(character['armors']);
    character.bodyLocalizations = CharacterBodyLocalization.arrayFromJSON(character['bodyLocalizations']);
    character.conditions = CharacterCondition.arrayFromJSON(character['conditions']);
    return character;
  }

  static arrayFromJSON(objectsArray: Object[]): Character[] {
    let characters = [];
    for (let object of objectsArray) {
      let character = Character.fromJSON(object);
      characters.push(character);
    }
    return characters;
  }
}
