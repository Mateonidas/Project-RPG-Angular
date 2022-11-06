import {Injectable} from '@angular/core';
import {CharacterSkill} from "../../../model/skill/character-skill.model";
import {TextResourceService} from "../text-resource-service/text-resource.service";
import {CharacterTalent} from "../../../model/talent/character-talent.model";
import {CharacterWeapon} from "../../../model/weapon/character-weapon.model";
import {CharacterBodyLocalization} from "../../../model/body-localization/character-body-localization.model";
import {CharacterCondition} from "../../../model/condition/character-condition.model";
import {Weapon} from "../../../model/weapon/weapon.model";
import {Armor} from "../../../model/armor/armor.model";
import {Character} from "../../../model/character/character.model";
import {Talent} from "../../../model/talent/talent.model";
import {Model} from "../../../model/model";
import {WeaponQuality} from "../../../model/weapon/weapon-quality.model";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor() {
  }

  public prepareCharacter(character: Character) {
    this.prepareSkills(character.skills);
    this.prepareCharacterTalents(character.talents);
    this.prepareWeapons(character.weapons);
    this.prepareArmorsList(character.armors);
    this.prepareBodyLocalizations(character.bodyLocalizations);
    this.prepareCharacterConditions(character.conditions);
  }

  private prepareSkills(skills: CharacterSkill[]) {
    for (let skill of skills) {
      skill.skill.nameTranslation = TextResourceService.getSkillNameTranslation(skill.skill.name).nameTranslation
    }
  }

  private prepareCharacterTalents(talents: CharacterTalent[]) {
    for (let characterTalent of talents) {
      this.prepareTalent(characterTalent.talent);
    }
  }

  public prepareTalent(talent: Talent) {
    let talentTranslation = TextResourceService.getTalentNameTranslation(talent.name);
    talent.nameTranslation = talentTranslation.nameTranslation;
    talent.description = talentTranslation.description;
  }

  private prepareWeapons(weapons: CharacterWeapon[]) {
    for (let weapon of weapons) {
      this.prepareWeaponTranslation(weapon.weapon);
    }
  }

  public prepareWeaponTranslation(weapon: Weapon) {
    weapon.weaponType.nameTranslation = TextResourceService.getWeaponTypeNameTranslation(weapon.weaponType.name).nameTranslation;
    weapon.weaponGroupType.nameTranslation = TextResourceService.getWeaponGroupTypeNameTranslation(weapon.weaponGroupType.name).nameTranslation;
    weapon.weaponReach.nameTranslation = TextResourceService.getWeaponReachNameTranslation(weapon.weaponReach.name).nameTranslation;

    for (let quality of weapon.weaponQualities) {
      this.prepareWeaponQuality(quality)
    }
  }

  public prepareWeaponQuality(quality: WeaponQuality) {
    let weaponQualityTranslation = TextResourceService.getWeaponQualityNameTranslation(quality.name);
    quality.nameTranslation = weaponQualityTranslation.nameTranslation;
    quality.description = weaponQualityTranslation.description;
  }

  private prepareBodyLocalizations(bodyLocalizations: CharacterBodyLocalization[]) {
    for (let characterBodyLocalization of bodyLocalizations) {
      characterBodyLocalization.bodyLocalization.nameTranslation = TextResourceService.getBodyLocalizationNameTranslation(characterBodyLocalization.bodyLocalization.name).nameTranslation;
      for (let characterInjury of characterBodyLocalization.injuries) {
        characterInjury.injury.nameTranslation = TextResourceService.getInjuryNameTranslation(characterInjury.injury.name).nameTranslation;
      }
    }
  }

  public prepareCharacterConditions(conditions: CharacterCondition[]) {
    for (let characterCondition of conditions) {
      this.prepareCondition(characterCondition.condition);
    }
  }

  public prepareCondition(condition: Model) {
    let conditionTranslation = TextResourceService.getConditionTranslation(condition.name);
    condition.nameTranslation = conditionTranslation.nameTranslation
    condition.description = conditionTranslation.description;
  }

  public prepareArmorsList(armors: Armor[]) {
    for (let armor of armors) {
      this.prepareArmorTranslation(armor);
    }
    armors.sort(
      (a, b) => (a.armorCategory.name > b.armorCategory.name) ? 1 : ((b.armorCategory.name > a.armorCategory.name) ? -1 : 0)
    )
  }

  private prepareArmorTranslation(armor: Armor) {
    armor.armorCategory.nameTranslation = TextResourceService.getArmorCategoryNameTranslation(armor.armorCategory.name).nameTranslation;

    for (let armorBodyLocalization of armor.armorBodyLocalizations) {
      armorBodyLocalization.bodyLocalization.nameTranslation = TextResourceService.getBodyLocalizationNameTranslation(armorBodyLocalization.bodyLocalization.name).nameTranslation;
    }

    if (armor.armorPenalties != undefined) {
      for (let penalty of armor.armorPenalties) {
        penalty.nameTranslation = TextResourceService.getArmorPenaltyNameTranslation(penalty.name).nameTranslation;
      }
    }

    if (armor.armorQualities != undefined) {
      for (let quality of armor.armorQualities) {
        this.prepareArmorQuality(quality);
      }
    }
  }

  public prepareArmorQuality(quality: Model) {
    let armorQualityTranslation = TextResourceService.getArmorQualityTranslation(quality.name);
    quality.nameTranslation = armorQualityTranslation.nameTranslation;
    quality.description = armorQualityTranslation.description;
  }
}
