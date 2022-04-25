import {Component} from '@angular/core';
import {Character} from "../model/character/character.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Skill} from "../model/skill/skill.model";
import {CharacterTalent} from "../model/talent/character-talent.model";
import {Weapon} from "../model/weapon/weapon.model";
import {Armor} from "../model/armor/armor.model";
import {CharacterFormArraysWrapper} from "../model/character/character-form-arrays-wrapper.model";
import {Model} from "../model/model";
import {ActivatedRoute, Router} from "@angular/router";
import {ArmorService} from "../shared/services/armor-service/armor.service";
import {WeaponService} from "../shared/services/weapon-service/weapon.service";
import {SkillService} from "../shared/services/skill-service/skill.service";
import {CharacterSkill} from "../model/skill/character-skill.model";
import {Talent} from "../model/talent/talent.model";
import {TalentService} from "../shared/services/talent-service/talent.service";
import {Characteristic} from "../model/characteristic/characteristic.model";
import {TextResourceService} from "../shared/services/text-resource-service/text-resource.service";
import {CharacterWeapon} from "../model/weapon/character-weapon.model";
import {CharacterBodyLocalization} from "../model/body-localization/character-body-localization.model";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent {

  editCharacterForm!: FormGroup;
  skillsList: Skill[] = [];
  talentsList: Talent[] = [];
  weaponsList: Weapon[] = [];
  armorsList: Armor[] = [];
  isRightHanded = true;
  isDead!: boolean;
  id!: number;
  characterBodyLocalizations!: CharacterBodyLocalization[];

  constructor(protected router: Router,
              protected route: ActivatedRoute,
              protected armorService: ArmorService,
              protected weaponService: WeaponService,
              protected skillService: SkillService,
              protected talentService: TalentService) {
  }

  protected prepareEditData(character: Character, formArrays: CharacterFormArraysWrapper) {
    if (character.skills) {
      this.prepareSkillsList(formArrays.skills, character.skills);
    }
    if (character.talents) {
      this.prepareTalentsList(formArrays.talents, character.talents);
    }
    if (character.weapons) {
      this.prepareWeaponsList(formArrays.weapons, character.weapons);
    }
    if (character.armors) {
      this.prepareArmorList(formArrays.armors, character.armors);
    }
  }

  prepareSkillsList(skills: FormArray, skillsList: CharacterSkill[]) {
    for (let characterSkill of skillsList) {
      skills.push(
        new FormGroup({
          'skill': new FormControl(characterSkill.skill),
          'value': new FormControl(characterSkill.value),
        })
      )
    }
  }

  prepareTalentsList(talents: FormArray, talentsList: CharacterTalent[]) {
    for (let talent of talentsList) {
      talents.push(
        new FormGroup({
          'talent': new FormControl(talent.talent),
          'value': new FormControl(talent.value),
        })
      )
    }
  }

  prepareWeaponsList(weapons: FormArray, weaponsList: CharacterWeapon[]) {
    for (let weapon of weaponsList) {
      weapons.push(
        new FormGroup({
          'weapon': new FormControl(weapon.weapon),
          'value': new FormControl(weapon.value)
        })
      )
    }
  }

  prepareArmorList(armorsForms: FormArray, characterArmors: Armor[]) {
    for (let armor of characterArmors) {
      armorsForms.push(
        new FormControl(armor)
      )
    }
  }

  protected static initEditCharacteristicsTable(character: Character) {
    return new FormArray([
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("MOVEMENT")),
        'value': new FormControl(character.movement.value)
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("WEAPON_SKILL")),
        'value': new FormControl(character.weaponSkill.value)
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("BALLISTIC_SKILL")),
        'value': new FormControl(character.ballisticSkill.value)
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("STRENGTH")),
        'value': new FormControl(character.strength.value)
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("TOUGHNESS")),
        'value': new FormControl(character.toughness.value)
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("INITIATIVE")),
        'value': new FormControl(character.initiative.value)
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("AGILITY")),
        'value': new FormControl(character.agility.value)
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("DEXTERITY")),
        'value': new FormControl(character.dexterity.value)
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("INTELLIGENCE")),
        'value': new FormControl(character.intelligence.value)
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("WILLPOWER")),
        'value': new FormControl(character.willpower.value)
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("FELLOWSHIP")),
        'value': new FormControl(character.fellowship.value)
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("WOUNDS")),
        'value': new FormControl(character.wounds.value)
      }),
    ]);
  }

  protected static prepareCharacteristic(name: string) {
    return new Characteristic(name, TextResourceService.getCharacteristicNameTranslation(name).nameTranslation);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }

  onAddSkill() {
    (<FormArray>this.editCharacterForm.get('skills')).push(
      new FormGroup({
        'skill': new FormControl(null),
        'value': new FormControl(null),
      })
    )
  }

  onAddTalent() {
    (<FormArray>this.editCharacterForm.get('talents')).push(
      new FormGroup({
        'talent': new FormControl(null),
        'value': new FormControl(null),
      })
    )
  }

  onAddWeapon() {
    (<FormArray>this.editCharacterForm.get('weapons')).push(
      new FormGroup({
        'weapon': new FormControl(null),
        'value': new FormControl(null),
      })
    )
  }

  onAddArmor() {
    (<FormArray>this.editCharacterForm.get('armors')).push(
      new FormControl(null),
    )
  }

  onSetTalentLevel(event: any, i: number) {
    this.talents[i].value.value = event.target.value;
  }

  get characteristics() {
    return (<FormArray>this.editCharacterForm.get('characteristics')).controls;
  }

  get skills() {
    return (<FormArray>this.editCharacterForm.get('skills')).controls;
  }

  get talents() {
    return (<FormArray>this.editCharacterForm.get('talents')).controls;
  }

  get weapons() {
    return <FormControl[]>(<FormArray>this.editCharacterForm.get('weapons')).controls;
  }

  get armors() {
    return <FormControl[]>(<FormArray>this.editCharacterForm.get('armors')).controls;
  }

  onDeleteSkill(index: number) {
    (<FormArray>this.editCharacterForm.get('skills')).removeAt(index);
  }

  onDeleteTalent(index: number) {
    (<FormArray>this.editCharacterForm.get('talents')).removeAt(index);
  }

  onDeleteWeapon(index: number) {
    (<FormArray>this.editCharacterForm.get('weapons')).removeAt(index);
  }

  onDeleteArmor(index: number) {
    (<FormArray>this.editCharacterForm.get('armors')).removeAt(index);
  }
}
