import {Talent} from "./talent.model";

export class CharacterTalent {
  public id: number
  public talent: Talent
  public value: number

  constructor(id?: number, talent?: Talent, level?: number) {
    this.id = <number>id
    this.talent = <Talent>talent
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
