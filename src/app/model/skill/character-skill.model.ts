import {Skill} from "./skill.model";

export class CharacterSkill {
  public id: number
  public skill: Skill
  public value: number

  constructor(id?: number, skill?: Skill, value?: number) {
    this.id = <number>id
    this.skill = <Skill>skill
    this.value = <number>value
  }

  static fromJSON(object: Object): CharacterSkill {
    let characterSkill = Object.assign(new CharacterSkill(), object)
    characterSkill.skill = Skill.fromJSON(characterSkill['skill'])
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
