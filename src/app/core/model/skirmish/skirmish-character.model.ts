import {Character} from "../character/character.model"

export class SkirmishCharacter {
  id!: number
  character!: Character
  currentWounds!: number
  skirmishInitiative!: number
  advantage!: number
  isDead!: boolean
  sequenceNumber!: number

  constructor(character?: Character, id?: number) {
    if (character != undefined) {
      this.id = <number>id
      this.character = <Character>character
      this.currentWounds = <number>character.wounds.value
      this.skirmishInitiative = <number>character.initiative.value
      this.advantage = 0
      this.isDead = false
      this.character.clearIds()
    }
  }

  static fromJSON(object: Object): SkirmishCharacter {
    let skirmishCharacter = Object.assign(new SkirmishCharacter(), object)
    skirmishCharacter.character = Character.fromJSON(skirmishCharacter['character'])
    return skirmishCharacter
  }

  static arrayFromJSON(objectsArray: Object[]): SkirmishCharacter[] {
    let skirmishCharacters = []
    for (let object of objectsArray) {
      let character = SkirmishCharacter.fromJSON(object)
      skirmishCharacters.push(character)
    }
    return skirmishCharacters
  }
}
