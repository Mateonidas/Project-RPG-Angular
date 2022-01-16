import {Component, OnInit} from '@angular/core';
import {Character} from "../model/character/character.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {SkillsList} from "../model/skill/skill.model";
import {CharacterTalent, TalentsList} from "../model/talent/character-talent.model";
import {Weapon, WeaponsList} from "../model/weapon/weapon.model";
import {Armor, ArmorsList} from "../model/armor/armor.model";
import {CharacterFormArraysWrapper} from "../model/character/character-form-arrays-wrapper.model";
import {Model} from "../model/model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CharacterCharacteristics} from "../model/characteristic/character-characteristic.model";
import {ArmorService} from "../shared/services/armor-service/armor.service";
import {WeaponService} from "../shared/services/weapon-service/weapon.service";
import {SkillService} from "../shared/services/skill-service/skill.service";
import {CharacterSkill} from "../model/skill/character-skill.model";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent {

  editCharacterForm!: FormGroup;
  skillsList = SkillsList.list;
  talentsList = new TalentsList();
  weaponsList: Weapon[] = [];
  armorsList: Armor[] = [];
  isRightHanded = true;
  isDead!: boolean;
  id!: number;

  constructor(protected router: Router,
              protected route: ActivatedRoute,
              protected armorService: ArmorService,
              protected weaponService: WeaponService,
              protected skillService: SkillService) {
  }

  // ngOnInit(): void {
  //   this.route.params.subscribe(
  //     (params: Params) => {
  //       this.id = +params['id'];
  //       this.initForm();
  //     }
  //   )
  // }
  //
  // protected initForm() {
  // }

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
    if (character.armor) {
      this.prepareArmorList(formArrays.armors, character.armor);
    }
  }

  prepareSkillsList(skills: FormArray, skillsList: CharacterSkill[]) {
    for (let characterSkill of skillsList) {
      skills.push(
        new FormGroup({
          'base': new FormControl(characterSkill.base),
          'value': new FormControl(characterSkill.value),
        })
      )
    }
  }

  prepareTalentsList(talents: FormArray, talentsList: CharacterTalent[]) {
    for (let talent of  talentsList) {
      talents.push(
        new FormGroup({
          'talent': new FormControl(talent),
          'name': new FormControl(talent.name),
          'nameTranslation': new FormControl(talent.nameTranslation),
          'level': new FormControl(talent.level),
          'maxLevel': new FormControl(talent.maxLevel),
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

  protected static initEditCharacteristicsTable(characteristics: CharacterCharacteristics) {
    return new FormArray([
      new FormGroup({
        'name': new FormControl('Sz'),
        'value': new FormControl(characteristics.movement.value)
      }),
      new FormGroup({
        'name': new FormControl('WW'),
        'value': new FormControl(characteristics.weaponSkill.value)
      }),
      new FormGroup({
        'name': new FormControl('US'),
        'value': new FormControl(characteristics.ballisticSkill.value)
      }),
      new FormGroup({
        'name': new FormControl('S'),
        'value': new FormControl(characteristics.strength.value)
      }),
      new FormGroup({
        'name': new FormControl('Wt'),
        'value': new FormControl(characteristics.toughness.value)
      }),
      new FormGroup({
        'name': new FormControl('I'),
        'value': new FormControl(characteristics.initiative.value)
      }),
      new FormGroup({
        'name': new FormControl('Zw'),
        'value': new FormControl(characteristics.agility.value)
      }),
      new FormGroup({
        'name': new FormControl('Zr'),
        'value': new FormControl(characteristics.dexterity.value)
      }),
      new FormGroup({
        'name': new FormControl('Int'),
        'value': new FormControl(characteristics.intelligence.value)
      }),
      new FormGroup({
        'name': new FormControl('SW'),
        'value': new FormControl(characteristics.willpower.value)
      }),
      new FormGroup({
        'name': new FormControl('Ogd'),
        'value': new FormControl(characteristics.fellowship.value)
      }),
      new FormGroup({
        'name': new FormControl('Żyw'),
        'value': new FormControl(characteristics.wounds.value)
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
        'talent': new FormControl(new CharacterTalent('', '', '', 0)),
        'name': new FormControl(null),
        'nameTranslation': new FormControl(null),
        'level': new FormControl(null),
        'maxLevel': new FormControl(null),
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
        'armor': new FormControl(new Armor('', '', '', [], [], 0, [])),
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

  configureCharacteristics() {
    const characteristicsValues = this.editCharacterForm.value.characteristics;
    return new CharacterCharacteristics(
      characteristicsValues[0].value,
      characteristicsValues[1].value,
      characteristicsValues[2].value,
      characteristicsValues[3].value,
      characteristicsValues[4].value,
      characteristicsValues[5].value,
      characteristicsValues[6].value,
      characteristicsValues[7].value,
      characteristicsValues[8].value,
      characteristicsValues[9].value,
      characteristicsValues[10].value,
      characteristicsValues[11].value
    )
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
