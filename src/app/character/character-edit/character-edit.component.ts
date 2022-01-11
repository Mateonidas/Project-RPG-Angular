import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {CharacterService} from "../../shared/services/character-service/character.service";
import {Character} from "../../model/character/character.model";
import {EditFormComponent} from "../../edit-form/edit-form.component";
import {CharacterFormArraysWrapper} from "../../model/character/character-form-arrays-wrapper.model";
import {ArmorService} from "../../shared/services/armor-service/armor.service";
import {WeaponService} from "../../shared/services/weapon-service/weapon.service";

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent extends EditFormComponent implements OnInit {

  editMode = false;

  constructor(router: Router,
              route: ActivatedRoute,
              private characterService: CharacterService,
              armorService: ArmorService,
              weaponService: WeaponService) {
    super(router, route, armorService, weaponService);
  }

  ngOnInit(): void {
    this.armorsList = this.armorService.armorsList;
    this.weaponsList = this.weaponService.weaponsList;
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
      const character = this.characterService.getCharacter(this.id);
      characterName = character.name;
      characterDescription = character.description;
      characteristics = CharacterEditComponent.initEditCharacteristicsTable(character.characteristics);
      this.isRightHanded = character.isRightHanded;
      this.prepareEditData(character, formArrays)
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
    if (this.editMode) {
      this.characterService.updateCharacter(this.id, this.createCharacter());
    } else {
      this.characterService.addNewCharacter(this.createCharacter());
    }
    this.onCancel()
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

  createCharacter() {
    this.configureFields();
    return this.createCharacterModel();
  }

  createCharacterModel() {
    const name = this.editCharacterForm.value.name;
    const description = this.editCharacterForm.value.description;
    const characteristics = this.configureCharacteristics();
    const skills = this.editCharacterForm.value.skills;
    const talents = this.editCharacterForm.value.talents;
    const isRightHanded = this.editCharacterForm.value.isRightHanded;
    const weapons = this.editCharacterForm.value.weapons;
    const armors = this.editCharacterForm.value.armors;

    return new Character(
      name,
      description,
      characteristics,
      skills,
      talents,
      isRightHanded,
      weapons,
      armors
    );
  }
}
