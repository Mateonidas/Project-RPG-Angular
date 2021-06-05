import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AbstractControl, FormArray, FormControl, FormGroup, NgForm} from "@angular/forms";
import {Skill, SkillsList} from "../../model/skill.model";
import {Talent, TalentsList} from "../../model/talent.model";
import {Weapon, WeaponsList} from "../../model/weapon.model";
import {Armor, ArmorsList} from "../../model/armor.model";
import {CharacterService} from "../character-service/character.service";
import {Character} from "../../model/character.model";
import {Characteristic} from "../../model/characteristic.model";
import {Model} from "../../model/model";

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent implements OnInit {
  characterForm!: FormGroup;
  skillsList = new SkillsList();
  talentsList = new TalentsList();
  weaponsList = new WeaponsList();
  armorsList = new ArmorsList();
  id!: number;
  editMode = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private characterService: CharacterService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm() {
    let characterName = '';
    let characterDescription = '';
    let characteristics;
    let skills = new FormArray([]);
    let talents = new FormArray([]);
    let weapons = new FormArray([]);
    let armors = new FormArray([]);

    if (this.editMode) {
      const character = this.characterService.getCharacter(this.id);
      characterName = character.name;
      characterDescription = character.description;
      characteristics = CharacterEditComponent.initEditCharacteristicsTable(character.characteristics);
      if (character.skills) {
        this.prepareSkillsList(skills, character.skills);
      }
      if (character.talents) {
        this.prepareTalentsList(talents, character.talents);
      }
      if (character.weapons) {
        this.prepareWeaponsList(weapons, character.weapons);
      }
      if (character.armor) {
        this.prepareArmorList(armors, character.armor);
      }
    } else {
      characteristics = CharacterEditComponent.initCharacteristicsTable();
    }

    this.characterForm = new FormGroup({
      'name': new FormControl(characterName),
      'description': new FormControl(characterDescription),
      'characteristics': characteristics,
      'skills': skills,
      'talents': talents,
      'weapons': weapons,
      'armors': armors
    });
  }

  get characteristics() {
    return (<FormArray>this.characterForm.get('characteristics')).controls;
  }

  get skills() {
    return (<FormArray>this.characterForm.get('skills')).controls;
  }

  get talents() {
    return (<FormArray>this.characterForm.get('talents')).controls;
  }

  get weapons() {
    return (<FormArray>this.characterForm.get('weapons')).controls;
  }

  get armors() {
    return (<FormArray>this.characterForm.get('armors')).controls;
  }

  onSubmit() {
    if(this.editMode){
      this.characterService.updateCharacter(this.id, this.createCharacter());
    }else {
      this.characterService.addNewCharacter(this.createCharacter());
    }
    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }

  prepareSkillsList(skills: FormArray, skillsList: Skill[]) {
    for (let skill of skillsList) {
      skills.push(
        new FormGroup({
          'skill': new FormControl(skill),
          'name': new FormControl(skill.name),
          'nameTranslation': new FormControl(skill.nameTranslation),
          'value': new FormControl(skill.value),
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
          'type': new FormControl(weapon.type),
          'category': new FormControl(weapon.category),
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

  onAddSkill() {
    (<FormArray>this.characterForm.get('skills')).push(
      new FormGroup({
        'skill': new FormControl(null),
        'name': new FormControl(null),
        'nameTranslation': new FormControl(null),
        'value': new FormControl(null),
      })
    )
  }

  onAddTalent() {
    (<FormArray>this.characterForm.get('talents')).push(
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
    (<FormArray>this.characterForm.get('weapons')).push(
      new FormGroup({
        'weapon': new FormControl(new Weapon('', '', '', '', '', 0, true, [], [])),
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
    (<FormArray>this.characterForm.get('armors')).push(
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

  onDeleteSkill(index: number) {
    (<FormArray>this.characterForm.get('skills')).removeAt(index);
  }

  onDeleteTalent(index: number) {
    (<FormArray>this.characterForm.get('talents')).removeAt(index);
  }

  onDeleteWeapon(index: number) {
    (<FormArray>this.characterForm.get('weapons')).removeAt(index);
  }

  onDeleteArmor(index: number) {
    (<FormArray>this.characterForm.get('armors')).removeAt(index);
  }

  private static initCharacteristicsTable() {
    return new FormArray([
      new FormGroup({
        'name': new FormControl('Sz'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('WW'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('US'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('S'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('Wt'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('I'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('Zw'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('Zr'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('Int'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('SW'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('Ogd'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('Żyw'),
        'value': new FormControl('')
      }),
    ]);
  }

  private static initEditCharacteristicsTable(characteristics: Characteristic) {
    return new FormArray([
      new FormGroup({
        'name': new FormControl('Sz'),
        'value': new FormControl(characteristics.movement)
      }),
      new FormGroup({
        'name': new FormControl('WW'),
        'value': new FormControl(characteristics.weaponSkill)
      }),
      new FormGroup({
        'name': new FormControl('US'),
        'value': new FormControl(characteristics.ballisticSkill)
      }),
      new FormGroup({
        'name': new FormControl('S'),
        'value': new FormControl(characteristics.strength)
      }),
      new FormGroup({
        'name': new FormControl('Wt'),
        'value': new FormControl(characteristics.toughness)
      }),
      new FormGroup({
        'name': new FormControl('I'),
        'value': new FormControl(characteristics.initiative)
      }),
      new FormGroup({
        'name': new FormControl('Zw'),
        'value': new FormControl(characteristics.agility)
      }),
      new FormGroup({
        'name': new FormControl('Zr'),
        'value': new FormControl(characteristics.dexterity)
      }),
      new FormGroup({
        'name': new FormControl('Int'),
        'value': new FormControl(characteristics.intelligence)
      }),
      new FormGroup({
        'name': new FormControl('SW'),
        'value': new FormControl(characteristics.willpower)
      }),
      new FormGroup({
        'name': new FormControl('Ogd'),
        'value': new FormControl(characteristics.fellowship)
      }),
      new FormGroup({
        'name': new FormControl('Żyw'),
        'value': new FormControl(characteristics.wounds)
      }),
    ]);
  }

  createCharacter() {
    this.configureFields();
    return this.createCharacterModel();
  }

  createCharacterModel() {
    const name = this.characterForm.value.name;
    const description = this.characterForm.value.description;
    const characteristics = this.configureCharacteristics();
    const skills = this.characterForm.value.skills;
    const talents = this.characterForm.value.talents;
    const weapons = this.characterForm.value.weapons;
    const armors = this.characterForm.value.armors;

    return new Character(
      name,
      description,
      characteristics,
      skills,
      talents,
      weapons,
      armors
    );
  }

  onSetTalentLevel(event: any, i: number) {
    this.talents[i].value.level = event.target.value;
  }

  configureCharacteristics() {
    const characteristicsValues = this.characterForm.value.characteristics;
    return new Characteristic(
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
}
