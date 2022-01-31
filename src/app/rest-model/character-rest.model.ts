import {CharacterTalentRest} from "./character-talent-rest.model";
import {Weapon} from "../model/weapon/weapon.model";
import {Armor} from "../model/armor/armor.model";
import {CharacterCharacteristic} from "../model/characteristic/character-characteristic.model";
import {CharacterSkill} from "../model/skill/character-skill.model";

export interface CharacterRest {
  id: number;
  name: string;
  description: string;
  isRightHanded: boolean;
  characteristics: CharacterCharacteristic[];
  skills: CharacterSkill[];
  talents: CharacterTalentRest[];
  weapons: Weapon[];
  armors: Armor[];
}
