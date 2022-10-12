import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Character} from "../../model/character/character.model";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {CharacterFormArraysWrapper} from "../../model/character/character-form-arrays-wrapper.model";
import {ArmorService} from "../../shared/services/armor-service/armor.service";
import {WeaponService} from "../../shared/services/weapon-service/weapon.service";
import {SkillService} from "../../shared/services/skill-service/skill.service";
import {TalentService} from "../../shared/services/talent-service/talent.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BodyLocalizationService} from "../../shared/services/body-localization-service/body-localization.service";
import {CharacterService} from "../../shared/services/character-service/character.service";
import {InjuryService} from "../../shared/services/injuries-service/injury.service";
import {ConditionService} from "../../shared/services/condition-service/condition.service";
import {CharacterCharacteristic} from "../../model/characteristic/character-characteristic.model";
import {CharacterSkill} from "../../model/skill/character-skill.model";
import {CharacterTalent} from "../../model/talent/character-talent.model";
import {CharacterWeapon} from "../../model/weapon/character-weapon.model";
import {Armor} from "../../model/armor/armor.model";
import {CharacterCondition} from "../../model/condition/character-condition.model";
import {CharacterEditComponent} from "../../character/character-edit/character-edit.component";

@Component({
  selector: 'app-skirmish-character-edit',
  templateUrl: './skirmish-character-edit.component.html',
  styleUrls: ['./skirmish-character-edit.component.css']
})
export class SkirmishCharacterEditComponent extends CharacterEditComponent implements OnInit {

  editMode = false;

  constructor(router: Router,
              route: ActivatedRoute,
              public skirmishService: SkirmishCharacterService,
              public armorService: ArmorService,
              public weaponService: WeaponService,
              public skillService: SkillService,
              public talentService: TalentService,
              public bodyLocalizationService: BodyLocalizationService,
              public characterService: CharacterService,
              public injuryService: InjuryService,
              public conditionService: ConditionService,
              public modalService: NgbModal) {
    super(router, route, armorService, weaponService, skillService, talentService, bodyLocalizationService, characterService, injuryService, conditionService, modalService);
  }

  createEditCharacterForm(character: SkirmishCharacter, formArrays: CharacterFormArraysWrapper) {
    this.isDead = character.isDead;
    this.editCharacterForm = new FormGroup({
      'name': new FormControl(character.name),
      'description': new FormControl(character.description),
      'characteristics': formArrays.characteristics,
      'skills': formArrays.skills,
      'talents': formArrays.talents,
      'isRightHanded': new FormControl(this.isRightHanded),
      'weapons': formArrays.weapons,
      'armors': formArrays.armors,
      'injuries': formArrays.injuries,
      'conditions': formArrays.conditions,
      'currentWounds': new FormControl(character.currentWounds),
      'skirmishInitiative': new FormControl(character.skirmishInitiative),
      'advantage': new FormControl(character.advantage),
      'notes': formArrays.notes,
      'isDead': new FormControl(character.isDead),
    });
  }

  getCharacter() {
    return this.skirmishService.getSkirmishCharacter(this.id);
  }

  onSubmit() {
    let character = this.createCharacter();
    if (this.editMode) {
      character.id = this.id;
    }
    this.skirmishService.updateSkirmishCharacter(character);
    this.onCancel()
  }

  createCharacter() {
    const name = this.editCharacterForm.value.name;
    const description = this.editCharacterForm.value.description;
    const group = this.editCharacterForm.value.group;
    const characteristics = <CharacterCharacteristic[]>this.editCharacterForm.value.characteristics;
    const skills = <CharacterSkill[]>this.editCharacterForm.value.skills;
    const talents = <CharacterTalent[]>this.editCharacterForm.value.talents;
    const isRightHanded = this.editCharacterForm.value.isRightHanded;
    const weapons = <CharacterWeapon[]>this.editCharacterForm.value.weapons;
    const armors = <Armor[]>this.editCharacterForm.value.armors;
    const conditions = <CharacterCondition[]>this.editCharacterForm.value.conditions;
    const notes = <string[]>this.editCharacterForm.value.notes;

    const character = new SkirmishCharacter(
      new Character(
        name,
        description,
        group,
        characteristics,
        skills,
        talents,
        isRightHanded,
        weapons,
        armors,
        conditions,
        notes
      ));

    this.prepareCharacterBodyLocalizations(character);
    character.advantage = this.editCharacterForm.value.advantage;
    character.skirmishInitiative = this.editCharacterForm.value.skirmishInitiative;
    character.currentWounds = this.editCharacterForm.value.currentWounds;
    character.isDead = this.editCharacterForm.value.isDead;

    return character;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key == 'Enter') {
      this.onSubmit();
    }
    if(event.key == 'Escape') {
      this.onCancel();
    }
  }
}
