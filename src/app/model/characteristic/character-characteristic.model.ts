import {Characteristic, Characteristics} from "./characteristic.model";

export class CharacterCharacteristic {
  public base: Characteristic;
  public value: number;

  constructor(characteristic?: Characteristic, value?: number) {
    this.base = <Characteristic>characteristic;
    this.value = <number>value;
  }

  static fromJSON(object: Object): CharacterCharacteristic {
    return Object.assign(new CharacterCharacteristic(), object);
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterCharacteristic[] {
    let characteristics = [];
    for (let object of objectsArray) {
      let characteristic = CharacterCharacteristic.fromJSON(object);
      characteristics.push(characteristic);
    }
    return characteristics;
  }
}

export class CharacterCharacteristics {
  characteristics : CharacterCharacteristic[] = [
    new CharacterCharacteristic(Characteristics.movement, 0),
    new CharacterCharacteristic(Characteristics.weaponSkill, 0),
    new CharacterCharacteristic(Characteristics.ballisticSkill, 0),
    new CharacterCharacteristic(Characteristics.strength, 0),
    new CharacterCharacteristic(Characteristics.toughness, 0),
    new CharacterCharacteristic(Characteristics.initiative, 0),
    new CharacterCharacteristic(Characteristics.agility, 0),
    new CharacterCharacteristic(Characteristics.dexterity, 0),
    new CharacterCharacteristic(Characteristics.intelligence, 0),
    new CharacterCharacteristic(Characteristics.willpower, 0),
    new CharacterCharacteristic(Characteristics.fellowship, 0),
    new CharacterCharacteristic(Characteristics.wounds, 0),
  ]

  constructor(movement?: number, weaponSkill?: number, ballisticSkill?: number, strength?: number, toughness?: number, initiative?: number, agility?: number, dexterity?: number, intelligence?: number, willpower?: number, fellowship?: number, wounds?: number) {
    this.movement.value = <number>movement;
    this.weaponSkill.value = <number>weaponSkill;
    this.ballisticSkill.value = <number>ballisticSkill;
    this.strength.value = <number>strength;
    this.toughness.value = <number>toughness;
    this.initiative.value = <number>initiative;
    this.agility.value = <number>agility;
    this.dexterity.value = <number>dexterity;
    this.intelligence.value = <number>intelligence;
    this.willpower.value = <number>willpower;
    this.fellowship.value = <number>fellowship;
    this.wounds.value = <number>wounds;
  }

  private getCharacteristicByName(name: string): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.base.name == name);
  }

  public getCharacteristic(characteristic: Characteristic) {
    return <CharacterCharacteristic>this.characteristics.find(x => x.base == characteristic);
  }

  get movement(): CharacterCharacteristic {
    return this.getCharacteristicByName('Movement');
  }

  get weaponSkill(): CharacterCharacteristic {
    return this.getCharacteristicByName('WeaponSkill');
  }

  get ballisticSkill(): CharacterCharacteristic {
    return this.getCharacteristicByName('BallisticSkill');
  }

  get strength(): CharacterCharacteristic {
    return this.getCharacteristicByName('Strength');
  }

  get toughness(): CharacterCharacteristic {
    return this.getCharacteristicByName('Toughness');
  }

  get initiative(): CharacterCharacteristic {
    return this.getCharacteristicByName('Initiative');
  }

  get agility(): CharacterCharacteristic {
    return this.getCharacteristicByName('Agility');
  }

  get dexterity(): CharacterCharacteristic {
    return this.getCharacteristicByName('Dexterity');
  }

  get intelligence(): CharacterCharacteristic {
    return this.getCharacteristicByName('Intelligence');
  }

  get willpower(): CharacterCharacteristic {
    return this.getCharacteristicByName('Willpower');
  }

  get fellowship(): CharacterCharacteristic {
    return this.getCharacteristicByName('Fellowship');
  }

  get wounds(): CharacterCharacteristic {
    return this.getCharacteristicByName('Wounds');
  }

  static fromJSON(object: Object): CharacterCharacteristics {
    let characterCharacteristics = Object.assign(new CharacterCharacteristics(), object);
    characterCharacteristics.characteristics = CharacterCharacteristic.arrayFromJSON(characterCharacteristics['characteristics']);
    return characterCharacteristics;
  }
}
