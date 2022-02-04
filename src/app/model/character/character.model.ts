import {CharacterTalent} from "../talent/character-talent.model";
import {Weapon} from "../weapon/weapon.model";
import {Armor} from "../armor/armor.model";
import {CharacterCharacteristic} from "../characteristic/character-characteristic.model";
import {CharacterSkill} from "../skill/character-skill.model";

export class Character {
  name!: string;
  description!: string;
  characteristics!: CharacterCharacteristic[];
  skills!: CharacterSkill[];
  talents!: CharacterTalent[];
  isRightHanded!: boolean;
  weapons!: Weapon[];
  armors!: Armor[];

  constructor(name?: string, description?: string, characteristics?: CharacterCharacteristic[], skills?: CharacterSkill[], talents?: CharacterTalent[], rightHanded?: boolean, weapons?: Weapon[], armor?: Armor[]) {
    this.name = <string>name;
    this.description = <string>description;
    this.characteristics = <CharacterCharacteristic[]>characteristics;
    this.skills = <CharacterSkill[]>skills;
    this.talents = <CharacterTalent[]>talents;
    this.isRightHanded = <boolean>rightHanded;
    this.weapons = <Weapon[]>weapons;
    this.armors = <Armor[]>armor;
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
    character.weapons = Weapon.arrayFromJSON(character['weapons']);
    character.armors = Armor.arrayFromJSON(character['armors']);
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
