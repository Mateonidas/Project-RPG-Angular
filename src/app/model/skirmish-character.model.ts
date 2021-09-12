import {Character} from "./character.model";
import {TemporaryParameters} from "./temporary-parameters.model";
import {BodyLocalization} from "./body-localization.model";

export class SkirmishCharacter extends Character {

  public temporaryParameters: TemporaryParameters;

  constructor(character: Character) {
    super(character.name, character.description, character.characteristics, character.skills, character.talents, character.weapons, character.armor);
    this.temporaryParameters = new TemporaryParameters(character.characteristics.wounds.value, character.characteristics.initiative.value);
  }

  setTemporaryParameters(temporaryParameters: TemporaryParameters) {
    this.temporaryParameters = temporaryParameters;
  }

  getSkirmishInitiative() {
    return this.temporaryParameters.skirmishInitiative;
  }

  getArmorForBodyLocalization(localization: BodyLocalization){
    let armorForLocation = this.armor.filter(armor => armor.localization.includes(localization));

    let armorPoints = 0;

    for(let armor of armorForLocation) {
      armorPoints += armor.armorPoints;
    }

    return armorPoints;
  }
}
