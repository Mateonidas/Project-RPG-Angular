import {Model} from "../model";

export class CharacterCharacteristic {
  public id: number
  public characteristic: Model
  public value: number

  constructor(id? :number, characteristic?: Model, value?: number) {
    this.id = <number>id
    this.characteristic = <Model>characteristic
    this.value = <number>value
  }

  static fromJSON(object: Object): CharacterCharacteristic {
    let characterCharacteristics = Object.assign(new CharacterCharacteristic(), object)
    characterCharacteristics.characteristic = Model.fromJSON(characterCharacteristics['characteristic'])

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
