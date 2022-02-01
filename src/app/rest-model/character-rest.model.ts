import {Weapon} from "../model/weapon/weapon.model";
import {Armor} from "../model/armor/armor.model";
import {CharacterCharacteristic} from "../model/characteristic/character-characteristic.model";
import {CharacterSkill} from "../model/skill/character-skill.model";
import {CharacterTalent} from "../model/talent/character-talent.model";

export interface CharacterRest {
  id: number;
  name: string;
  description: string;
  isRightHanded: boolean;
  characteristics: CharacterCharacteristic[];
  skills: CharacterSkill[];
  talents: CharacterTalent[];
  weapons: Weapon[];
  armors: Armor[];
}
