import {Talent} from "./talent.model";

export class CharacterTalent {
  public id: number
  public model: Talent
  public value: number

  constructor(id?: number, talent?: Talent, level?: number) {
    this.id = <number>id
    this.model = <Talent>talent
    this.value = <number>level
  }

  static fromJSON(object: Object): CharacterTalent {
    return Object.assign(new CharacterTalent(), object);
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterTalent[] {
    let talents = [];
    for (let object of objectsArray) {
      let talent = CharacterTalent.fromJSON(object);
      talents.push(talent);
    }
    return talents;
  }
}
