import {Characteristic, Characteristics} from "./characteristic.model";

export class CharacterCharacteristic {
  public characteristic: Characteristic;
  public value: number;

  constructor(characteristic?: Characteristic, value?: number) {
    this.characteristic = <Characteristic>characteristic;
    this.value = <number>value;
  }

  public static prepareCharacteristicsTable(characteristics: CharacterCharacteristic[]) {
    for (let characteristic of characteristics) {
      characteristics.push(characteristic);
    }

    return characteristics;
  }

  static fromJSON(object: Object): CharacterCharacteristic {
    let characterCharacteristics = Object.assign(new CharacterCharacteristic(), object);
    characterCharacteristics.characteristic = Characteristic.fromJSON(characterCharacteristics['characteristic']);

    return characterCharacteristics;
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
  characteristics: CharacterCharacteristic[] = [
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

  public prepareCharacteristicsTable(characteristics: CharacterCharacteristic[]) {
    for (let characteristic of characteristics) {
      this.getCharacteristicByName(characteristic.characteristic.name).value = characteristic.value;
    }
  }

  private getCharacteristicByName(name: string): CharacterCharacteristic {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == name);
  }

  public getCharacteristic(characteristic: Characteristic) {
    return <CharacterCharacteristic>this.characteristics.find(x => x.characteristic.name == characteristic.name);
  }

  get movement(): CharacterCharacteristic {
    return this.getCharacteristicByName('MOVEMENT');
  }

  get weaponSkill(): CharacterCharacteristic {
    return this.getCharacteristicByName('WEAPON_SKILL');
  }

  get ballisticSkill(): CharacterCharacteristic {
    return this.getCharacteristicByName('BALLISTIC_SKILL');
  }

  get strength(): CharacterCharacteristic {
    return this.getCharacteristicByName('STRENGTH');
  }

  get toughness(): CharacterCharacteristic {
    return this.getCharacteristicByName('TOUGHNESS');
  }

  get initiative(): CharacterCharacteristic {
    return this.getCharacteristicByName('INITIATIVE');
  }

  get agility(): CharacterCharacteristic {
    return this.getCharacteristicByName('AGILITY');
  }

  get dexterity(): CharacterCharacteristic {
    return this.getCharacteristicByName('DEXTERITY');
  }

  get intelligence(): CharacterCharacteristic {
    return this.getCharacteristicByName('INTELLIGENCE');
  }

  get willpower(): CharacterCharacteristic {
    return this.getCharacteristicByName('WILLPOWER');
  }

  get fellowship(): CharacterCharacteristic {
    return this.getCharacteristicByName('FELLOWSHIP');
  }

  get wounds(): CharacterCharacteristic {
    return this.getCharacteristicByName('WOUNDS');
  }

  static fromJSON(object: Object): CharacterCharacteristics {
    let characterCharacteristics = Object.assign(new CharacterCharacteristics(), object);
    characterCharacteristics.characteristics = CharacterCharacteristic.arrayFromJSON(characterCharacteristics['characteristics']);
    return characterCharacteristics;
  }
}
