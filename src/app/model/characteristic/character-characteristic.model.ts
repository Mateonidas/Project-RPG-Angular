import {Characteristic} from "./characteristic.model";

export class CharacterCharacteristic {
  public id: number
  public characteristic: Characteristic
  public value: number

  constructor(id? :number, characteristic?: Characteristic, value?: number) {
    this.id = <number>id
    this.characteristic = <Characteristic>characteristic
    this.value = <number>value
  }

  static fromJSON(object: Object): CharacterCharacteristic {
    let characterCharacteristics = Object.assign(new CharacterCharacteristic(), object)
    characterCharacteristics.characteristic = Characteristic.fromJSON(characterCharacteristics['characteristic'])

    return characterCharacteristics
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterCharacteristic[] {
    let characteristics = []
    for (let object of objectsArray) {
      let characteristic = CharacterCharacteristic.fromJSON(object)
      characteristics.push(characteristic)
    }
    return characteristics
  }
}
