import {Characteristic} from "./characteristic.model";

export class CharacterCharacteristic {
  public characteristic: Characteristic;
  public value: number;

  constructor(characteristic?: Characteristic, value?: number) {
    this.characteristic = <Characteristic>characteristic;
    this.value = <number>value;
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
