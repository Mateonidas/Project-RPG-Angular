import {Character} from "./character.model";
import {TemporaryParameters} from "./temporary-parameters.model";

export class SkirmishCharacter extends Character {

  public temporaryParameters: TemporaryParameters;

  constructor(character: Character) {
    super(character.name, character.description, character.characteristics, character.skills, character.talents, character.weapons, character.armor);
    this.temporaryParameters = new TemporaryParameters(character.characteristics.wounds, character.characteristics.initiative);
  }

  setTemporaryParameters(temporaryParameters: TemporaryParameters) {
    this.temporaryParameters = temporaryParameters;
  }

  getSkirmishInitiative() {
    return this.temporaryParameters.skirmishInitiative;
  }
}
