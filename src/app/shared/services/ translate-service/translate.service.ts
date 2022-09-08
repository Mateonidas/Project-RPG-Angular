import {Injectable} from '@angular/core';
import {CharacterSkill} from "../../../model/skill/character-skill.model";
import {TextResourceService} from "../text-resource-service/text-resource.service";
import {CharacterTalent} from "../../../model/talent/character-talent.model";
import {CharacterWeapon} from "../../../model/weapon/character-weapon.model";
import {CharacterBodyLocalization} from "../../../model/body-localization/character-body-localization.model";
import {CharacterCondition} from "../../../model/condition/condition.model";
import {Weapon} from "../../../model/weapon/weapon.model";
import {Armor} from "../../../model/armor/armor.model";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor() {
  }

  public prepareSkills(skills: CharacterSkill[]) {
    for (let skill of skills) {
      skill.skill.nameTranslation = TextResourceService.getSkillNameTranslation(skill.skill.name).nameTranslation
    }
  }

  public prepareTalents(talents: CharacterTalent[]) {
    for (let talent of talents) {
      talent.talent.nameTranslation = TextResourceService.getTalentNameTranslation(talent.talent.name).nameTranslation;
    }
  }

  public prepareWeapons(weapons: CharacterWeapon[]) {
    for (let weapon of weapons) {
      this.prepareWeaponTranslation(weapon.weapon);
    }
  }

  public prepareWeaponTranslation(weapon: Weapon) {
    weapon.weaponType.nameTranslation = TextResourceService.getWeaponTypeNameTranslation(weapon.weaponType.name).nameTranslation;
    weapon.weaponGroupType.nameTranslation = TextResourceService.getWeaponGroupTypeNameTranslation(weapon.weaponGroupType.name).nameTranslation;
    weapon.weaponReach.nameTranslation = TextResourceService.getWeaponReachNameTranslation(weapon.weaponReach.name).nameTranslation;

    for (let quality of weapon.weaponQualities) {
      quality.nameTranslation = TextResourceService.getWeaponQualityNameTranslation(quality.name).nameTranslation;
    }
  }

  public prepareBodyLocalizations(bodyLocalizations: CharacterBodyLocalization[]) {
    for (let characterBodyLocalization of bodyLocalizations) {
      characterBodyLocalization.bodyLocalization.nameTranslation = TextResourceService.getBodyLocalizationNameTranslation(characterBodyLocalization.bodyLocalization.name).nameTranslation;
      for (let characterInjury of characterBodyLocalization.injuries) {
        characterInjury.injury.nameTranslation = TextResourceService.getInjuryNameTranslation(characterInjury.injury.name).nameTranslation;
      }
    }
  }

  public prepareConditions(conditions: CharacterCondition[]) {
    for (let characterCondition of conditions) {
      characterCondition.condition.nameTranslation = TextResourceService.getConditionNameTranslation(characterCondition.condition.name).nameTranslation
    }
  }

  public prepareArmorTranslation(armor: Armor) {
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
        quality.nameTranslation = TextResourceService.getArmorQualitiesNameTranslation(quality.name).nameTranslation;
      }
    }
  }
}
