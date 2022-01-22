import {CharacterCharacteristicRest} from "./character-characteristic-rest.model";
import {CharacterSkillRest} from "./character-skill-rest.model";
import {CharacterTalentRest} from "./character-talent-rest.model";
import {WeaponRest} from "./weapon-rest.model";
import {ArmorRest} from "./armor-rest.model";

export interface CharacterRest {
  id: number;
  name: string;
  description: string;
  isRightHanded: boolean;
  characteristics: CharacterCharacteristicRest[];
  skills: CharacterSkillRest[];
  talents: CharacterTalentRest[];
  weapons: WeaponRest[];
  armors: ArmorRest[];
}
