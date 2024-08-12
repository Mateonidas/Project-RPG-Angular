import {Skill} from "./skill.model";

export class CharacterSkill {
  public id: number
  public model: Skill
  public value: number

  constructor(id?: number, skill?: Skill, value?: number) {
    this.id = <number>id
    this.model = <Skill>skill
    this.value = <number>value
  }

  static fromJSON(object: Object): CharacterSkill {
    let characterSkill = Object.assign(new CharacterSkill(), object)
    characterSkill.model = Skill.fromJSON(characterSkill['model'])
    return characterSkill
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterSkill[] {
    let characterSkills = []
    for (let object of objectsArray) {
      let characterSkill = CharacterSkill.fromJSON(object)
      characterSkills.push(characterSkill)
    }
    return characterSkills
  }
}
