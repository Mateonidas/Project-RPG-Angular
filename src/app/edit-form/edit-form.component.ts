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
          'base': new FormControl(characterSkill.skill),
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

  prepareWeaponsList(weapons: FormArray, weaponsList: Weapon[]) {
    for (let weapon of weaponsList) {
      weapons.push(
        new FormGroup({
          'weapon': new FormControl(weapon),
        })
      )
    }
  }

  prepareArmorList(armorsForms: FormArray, characterArmors: Armor[]) {
    for (let armor of characterArmors) {
      armorsForms.push(
        new FormGroup({
          'armor': new FormControl(armor),
          'name': new FormControl(armor.name),
          'category': new FormControl(null),
          'penalties': new FormControl(null),
          'localization': new FormControl(null),
          'armorPoints': new FormControl(null),
          'qualities': new FormControl(null)
        })
      )
    }
  }

  protected static initEditCharacteristicsTable(character: Character) {
    return new FormArray([
      new FormGroup({
        'name': new FormControl('Sz'),
        'value': new FormControl(character.movement.value)
      }),
      new FormGroup({
        'name': new FormControl('WW'),
        'value': new FormControl(character.weaponSkill.value)
      }),
      new FormGroup({
        'name': new FormControl('US'),
        'value': new FormControl(character.ballisticSkill.value)
      }),
      new FormGroup({
        'name': new FormControl('S'),
        'value': new FormControl(character.strength.value)
      }),
      new FormGroup({
        'name': new FormControl('Wt'),
        'value': new FormControl(character.toughness.value)
      }),
      new FormGroup({
        'name': new FormControl('I'),
        'value': new FormControl(character.initiative.value)
      }),
      new FormGroup({
        'name': new FormControl('Zw'),
        'value': new FormControl(character.agility.value)
      }),
      new FormGroup({
        'name': new FormControl('Zr'),
        'value': new FormControl(character.dexterity.value)
      }),
      new FormGroup({
        'name': new FormControl('Int'),
        'value': new FormControl(character.intelligence.value)
      }),
      new FormGroup({
        'name': new FormControl('SW'),
        'value': new FormControl(character.willpower.value)
      }),
      new FormGroup({
        'name': new FormControl('Ogd'),
        'value': new FormControl(character.fellowship.value)
      }),
      new FormGroup({
        'name': new FormControl('Żyw'),
        'value': new FormControl(character.wounds.value)
      }),
    ]);
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
        'base': new FormControl(null),
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
        'name': new FormControl(null),
        'nameTranslation': new FormControl(null),
        'attackType': new FormControl(null),
        'weaponGroup': new FormControl(null),
        'range': new FormControl(null),
        'damage': new FormControl(null),
        'isUsingStrength': new FormControl(null),
        'qualities': new FormControl(null)
      })
    )
  }

  onAddArmor() {
    (<FormArray>this.editCharacterForm.get('armors')).push(
      new FormGroup({
        'armor': new FormControl(new Armor('', '', new Model(), [], [], 0, [])),
        'name': new FormControl(null),
        'nameTranslation': new FormControl(null),
        'category': new FormControl(null),
        'penalties': new FormControl(null),
        'localization': new FormControl(null),
        'armorPoints': new FormControl(null),
        'qualities': new FormControl(null)
      })
    )
  }

  onSetTalentLevel(event: any, i: number) {
    this.talents[i].value.level = event.target.value;
  }

  configureFields() {
    this.configureTalents();
    this.configureWeapons();
    this.configureArmors();
  }

  configureTalents() {
    this.talents.forEach(talent => {
      talent.value.nameTranslation = talent.value.talent.nameTranslation;
      talent.value.name = talent.value.talent.name;
      talent.value.maxLevel = talent.value.talent.maxLevel;
    })
  }

  configureWeapons() {
    this.weapons.forEach(weapon => {
      weapon.value.name = weapon.value.weapon.name;
      weapon.value.nameTranslation = weapon.value.weapon.nameTranslation;
      weapon.value.attackType = weapon.value.weapon.attackType;
      weapon.value.weaponGroup = weapon.value.weapon.weaponGroup;
      weapon.value.range = weapon.value.weapon.range;
      weapon.value.damage = weapon.value.weapon.damage;
      weapon.value.isUsingStrength = weapon.value.weapon.isUsingStrength;
      weapon.value.qualities = weapon.value.weapon.qualities;
    })
  }

  configureArmors() {
    this.armors.forEach(armor => {
      armor.value.name = armor.value.armor.name;
      armor.value.nameTranslation = armor.value.armor.nameTranslation;
      armor.value.category = armor.value.armor.category;
      armor.value.penalties = armor.value.armor.penalties;
      armor.value.localization = armor.value.armor.localization;
      armor.value.armorPoints = armor.value.armor.armorPoints;
      armor.value.qualities = armor.value.armor.qualities
    })
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
    return (<FormArray>this.editCharacterForm.get('weapons')).controls;
  }

  get armors() {
    return (<FormArray>this.editCharacterForm.get('armors')).controls;
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
