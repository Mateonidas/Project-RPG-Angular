import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {CharacterService} from "../../shared/services/character-service/character.service";
import {Character} from "../../model/character/character.model";
import {EditFormComponent} from "../../edit-form/edit-form.component";
import {CharacterFormArraysWrapper} from "../../model/character/character-form-arrays-wrapper.model";
import {ArmorService} from "../../shared/services/armor-service/armor.service";
import {WeaponService} from "../../shared/services/weapon-service/weapon.service";
import {SkillService} from "../../shared/services/skill-service/skill.service";
import {TalentService} from "../../shared/services/talent-service/talent.service";
import {CharacterCharacteristic} from "../../model/characteristic/character-characteristic.model";
import {CharacterSkill} from "../../model/skill/character-skill.model";
import {CharacterTalent} from "../../model/talent/character-talent.model";
import {Armor} from "../../model/armor/armor.model";
import {CharacterWeapon} from "../../model/weapon/character-weapon.model";
import {CharacterBodyLocalization} from "../../model/body-localization/character-body-localization.model";
import {BodyLocalizationList} from "../../model/body-localization/body-localization.model";

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent extends EditFormComponent implements OnInit {

  editMode = false;

  constructor(router: Router,
              route: ActivatedRoute,
              public characterService: CharacterService,
              public armorService: ArmorService,
              public weaponService: WeaponService,
              public skillService: SkillService,
              public talentService: TalentService) {
    super(router, route, armorService, weaponService, skillService, talentService);
  }

  ngOnInit(): void {
    this.armorsList = this.armorService.armorsList;
    this.weaponsList = this.weaponService.weaponsList;
    this.skillsList = this.skillService.skillList;
    this.talentsList = this.talentService.talentList;
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  initForm() {
    let characterName = '';
    let characterDescription = '';
    let characteristics;
    let formArrays = new CharacterFormArraysWrapper();

    if (this.editMode) {
      const character = <Character>this.characterService.getCharacter(this.id);
      characterName = character.name;
      characterDescription = character.description;
      characteristics = CharacterEditComponent.initEditCharacteristicsTable(character);
      this.isRightHanded = character.isRightHanded;
      this.prepareEditData(character, formArrays)
      this.characterBodyLocalizations = character.bodyLocalizations;
    } else {
      characteristics = CharacterEditComponent.initCharacteristicsTable();
    }

    this.editCharacterForm = new FormGroup({
      'name': new FormControl(characterName),
      'description': new FormControl(characterDescription),
      'characteristics': characteristics,
      'skills': formArrays.skills,
      'talents': formArrays.talents,
      'isRightHanded': new FormControl(this.isRightHanded),
      'weapons': formArrays.weapons,
      'armors': formArrays.armors
    });
  }

  onSubmit() {
    let character = this.createCharacter();
    if (this.editMode) {
      character.id = this.id;
    }
    this.characterService.storeCharacter(character).then(r => {
      this.onCancel()
    });
  }

  private static initCharacteristicsTable() {
    return new FormArray([
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("MOVEMENT")),
        'value': new FormControl('')
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("WEAPON_SKILL")),
        'value': new FormControl('')
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("BALLISTIC_SKILL")),
        'value': new FormControl('')
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("STRENGTH")),
        'value': new FormControl('')
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("TOUGHNESS")),
        'value': new FormControl('')
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("INITIATIVE")),
        'value': new FormControl('')
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("AGILITY")),
        'value': new FormControl('')
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("DEXTERITY")),
        'value': new FormControl('')
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("INTELLIGENCE")),
        'value': new FormControl('')
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("WILLPOWER")),
        'value': new FormControl('')
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("FELLOWSHIP")),
        'value': new FormControl('')
      }),
      new FormGroup({
        'characteristic': new FormControl(this.prepareCharacteristic("WOUNDS")),
        'value': new FormControl('')
      }),
    ]);
  }

  createCharacter() {
    const name = this.editCharacterForm.value.name;
    const description = this.editCharacterForm.value.description;
    const characteristics = <CharacterCharacteristic[]>this.editCharacterForm.value.characteristics;
    const skills = <CharacterSkill[]>this.editCharacterForm.value.skills;
    const talents = <CharacterTalent[]>this.editCharacterForm.value.talents;
    const isRightHanded = this.editCharacterForm.value.isRightHanded;
    const weapons = <CharacterWeapon[]>this.editCharacterForm.value.weapons;
    const armors = <Armor[]>this.editCharacterForm.value.armors;

    const character = new Character(
      name,
      description,
      characteristics,
      skills,
      talents,
      isRightHanded,
      weapons,
      armors
    );

    this.prepareCharacterBodyLocalizations(character);

    return character;
  }

  private prepareCharacterBodyLocalizations(character: Character) {

    if (this.characterBodyLocalizations == null || this.characterBodyLocalizations.length == 0) {
      const head = new CharacterBodyLocalization(BodyLocalizationList.head, 0, 0);
      const rightArm = new CharacterBodyLocalization(BodyLocalizationList.rightArm, 0, 0);
      const leftArm = new CharacterBodyLocalization(BodyLocalizationList.leftArm, 0, 0);
      const body = new CharacterBodyLocalization(BodyLocalizationList.body, 0, 0);
      const rightLeg = new CharacterBodyLocalization(BodyLocalizationList.rightLeg, 0, 0);
      const leftLeg = new CharacterBodyLocalization(BodyLocalizationList.leftLeg, 0, 0);
      character.bodyLocalizations = [];
      character.bodyLocalizations.push(head, rightArm, leftArm, body, rightLeg, leftLeg);
    } else {
      character.bodyLocalizations = this.characterBodyLocalizations;
      for (let bodyLocalization of character.bodyLocalizations) {
        bodyLocalization.armorPoints = 0;
      }
    }

    for (let armor of character.armors) {
      for (let bodyLocalization of armor.bodyLocalization) {
        for(let characterBodyLocalization of character.bodyLocalizations) {
          if(bodyLocalization.name === characterBodyLocalization.bodyLocalization.name) {
            characterBodyLocalization.armorPoints += armor.armorPoints;
            characterBodyLocalization.armorPoints -= characterBodyLocalization.brokenArmorPoints;
            break;
          }
        }
      }
    }
  }
}
