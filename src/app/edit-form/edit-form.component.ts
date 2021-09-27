import {Component, OnInit} from '@angular/core';
import {Character} from "../model/character.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {CharacterSkill, SkillsList} from "../model/skill/skill.model";
import {Talent, TalentsList} from "../model/talent.model";
import {Weapon, WeaponsList} from "../model/weapon/weapon.model";
import {Armor, ArmorsList} from "../model/armor.model";
import {CharacterFormArraysWrapper} from "../model/character-form-arrays-wrapper.model";
import {Model} from "../model/model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CharacterCharacteristics} from "../model/characteristic/characterCharacteristic.model";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  editCharacterForm!: FormGroup;
  skillsList = SkillsList.list;
  talentsList = new TalentsList();
  weaponsList = WeaponsList.list;
  armorsList = new ArmorsList();
  id!: number;

  constructor(protected router: Router,
              protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.initForm();
      }
    )
  }

  protected initForm() {
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
    if (character.armor) {
      this.prepareArmorList(formArrays.armors, character.armor);
    }
  }

  prepareSkillsList(skills: FormArray, skillsList: CharacterSkill[]) {
    for (let characterSkill of skillsList) {
      skills.push(
        new FormGroup({
          'skill': new FormControl(characterSkill.skill),
          'name': new FormControl(characterSkill.skill.name),
          'nameTranslation': new FormControl(characterSkill.skill.nameTranslation),
          'value': new FormControl(characterSkill.value),
        })
      )
    }
  }

  prepareTalentsList(talents: FormArray, talentsList: Talent[]) {
    for (let talent of talentsList) {
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
          'name': new FormControl(weapon.name),
          'nameTranslation': new FormControl(weapon.nameTranslation),
          'type': new FormControl(weapon.attackType),
          'category': new FormControl(weapon.weaponGroup),
          'range': new FormControl(weapon.range),
          'damage': new FormControl(weapon.damage),
          'isUsingStrength': new FormControl(weapon.isUsingStrength),
          'advantages': new FormControl(weapon.advantages),
          'disadvantages': new FormControl(weapon.disadvantages),
        })
      )
    }
  }

  prepareArmorList(armors: FormArray, armorsList: Armor[]) {
    for (let armor of armorsList) {
      armors.push(
        new FormGroup({
          'armor': new FormControl(armor),
          'name': new FormControl(armor.name),
          'category': new FormControl(null),
          'penalty': new FormControl(null),
          'localization': new FormControl(null),
          'armorPoints': new FormControl(null),
          'advantages': new FormControl(null),
          'disadvantages': new FormControl(null),
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
        'skill': new FormControl(null),
        'name': new FormControl(null),
        'nameTranslation': new FormControl(null),
        'value': new FormControl(null),
      })
    )
  }

  onAddTalent() {
    (<FormArray>this.editCharacterForm.get('talents')).push(
      new FormGroup({
        'talent': new FormControl(new Talent('', '', 0, '')),
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
        'type': new FormControl(null),
        'category': new FormControl(null),
        'range': new FormControl(null),
        'damage': new FormControl(null),
        'isUsingStrength': new FormControl(null),
        'advantages': new FormControl(null),
        'disadvantages': new FormControl(null),
      })
    )
  }

  onAddArmor() {
    (<FormArray>this.editCharacterForm.get('armors')).push(
      new FormGroup({
        'armor': new FormControl(new Armor('', '', '', '', [], 0, [], [])),
        'name': new FormControl(null),
        'nameTranslation': new FormControl(null),
        'category': new FormControl(null),
        'penalty': new FormControl(null),
        'localization': new FormControl(null),
        'armorPoints': new FormControl(null),
        'advantages': new FormControl(null),
        'disadvantages': new FormControl(null),
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
    this.configureSkills();
    this.configureTalents();
    this.configureWeapons();
    this.configureArmors();
  }

  configureSkills() {
    this.skills.forEach(skill => {
      skill.value.name = skill.value.skill.name;
      skill.value.nameTranslation = skill.value.skill.nameTranslation;
    })
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
      weapon.value.type = weapon.value.weapon.type;
      weapon.value.category = weapon.value.weapon.category;
      weapon.value.range = weapon.value.weapon.range;
      weapon.value.damage = weapon.value.weapon.damage;
      weapon.value.isUsingStrength = weapon.value.weapon.isUsingStrength;
      weapon.value.advantages = weapon.value.weapon.advantages;
      weapon.value.disadvantages = weapon.value.weapon.disadvantages;
    })
  }

  configureArmors() {
    this.armors.forEach(armor => {
      armor.value.name = armor.value.armor.name;
      armor.value.nameTranslation = armor.value.armor.nameTranslation;
      armor.value.category = armor.value.armor.category;
      armor.value.penalty = armor.value.armor.penalty;
      armor.value.localization = armor.value.armor.localization;
      armor.value.armorPoints = armor.value.armor.armorPoints;
      armor.value.advantages = armor.value.armor.advantages;
      armor.value.disadvantages = armor.value.armor.disadvantages;
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
