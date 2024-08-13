import {Component, HostListener, OnInit} from '@angular/core'
import {ActivatedRoute, Params, Router} from "@angular/router"
import {FormArray, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms"
import {CharacterService} from "../../../core/services/character-service/character.service"
import {Character} from "../../../core/model/character/character.model"
import {CharacterFormArraysWrapper} from "../../../core/model/character/character-form-arrays-wrapper.model"
import {CharacterCharacteristic} from "../../../core/model/characteristic/character-characteristic.model"
import {Armor} from "../../../core/model/armor/armor.model"
import {CharacterWeapon} from "../../../core/model/weapon/character-weapon.model"
import {CharacterBodyLocalization} from "../../../core/model/body-localization/character-body-localization.model"
import {BodyLocalizationList} from "../../../core/model/body-localization/body-localization.model"
import {CharacterCondition} from "../../../core/model/condition/character-condition.model"
import {MatDialog} from "@angular/material/dialog"
import {TextResourceService} from "../../../core/services/text-resource-service/text-resource.service"
import {Spell} from "../../../core/model/spell/spell.model"
import {Note} from "../../../core/model/note/note.model";
import {
  CharacteristicsEditComponent
} from "../../../shared/components/edit-form-components/characteristics-edit/characteristics-edit.component";
import {WeaponsEditComponent} from "../../../shared/components/edit-form-components/weapons-edit/weapons-edit.component";
import {ArmorEditComponent} from "../../../shared/components/edit-form-components/armor-edit/armor-edit.component";
import {NotesEditComponent} from "../../../shared/components/edit-form-components/notes-edit/notes-edit.component";
import {ConditionsEditComponent} from "../../../shared/components/edit-form-components/conditions-edit/conditions-edit.component";
import {SpellsEditComponent} from "../../../shared/components/edit-form-components/spells-edit/spells-edit.component";
import {SkillService} from "../../../core/services/skill-service/skill.service";
import {TalentService} from "../../../core/services/talent-service/talent.service";
import {TraitService} from "../../../core/services/trait-service/trait.service";
import {InjuryService} from "../../../core/services/injuries-service/injury.service";
import {ValueModel} from "../../../core/model/value-model";
import {Talent} from "../../../core/model/talent/talent.model";
import {Trait} from "../../../core/model/trait/trait.model";
import {Model} from "../../../core/model/model";

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent implements OnInit {

  editMode = false
  copyMode = false
  editCharacterForm!: FormGroup
  isRightHanded = true
  isDead!: boolean
  id!: number
  groupType!: string
  group!: string

  characterBodyLocalizations!: CharacterBodyLocalization[]
  text = TextResourceService

  constructor(public router: Router,
              public route: ActivatedRoute,
              public characterService: CharacterService,
              public skillService: SkillService,
              public talentService: TalentService,
              public traitService: TraitService,
              public injuryService: InjuryService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.copyMode = queryParams['copy'] == "true"
        this.groupType = queryParams['groupType']
        this.group = queryParams['group']
      }
    )
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null
        this.initForm()
      }
    )
  }

  initForm() {
    let character = new Character()
    let formArrays = new CharacterFormArraysWrapper()

    if (this.editMode) {
      character = this.getCharacter()
      this.isRightHanded = character.isRightHanded
      this.prepareEditData(character, formArrays)
      this.characterBodyLocalizations = character.bodyLocalizations
    } else {
      character.name = ''
      character.description = ''
      if (this.groupType != null && this.group != null) {
        character.groupType = this.groupType
        character.group = this.group
      }
    }
    formArrays.characteristics = CharacteristicsEditComponent.initCharacteristicsTable(character.characteristics)
    this.createEditCharacterForm(character, formArrays)
  }

  createEditCharacterForm(character: Character, formArrays: CharacterFormArraysWrapper) {
    this.editCharacterForm = new UntypedFormGroup({
      'name': new UntypedFormControl(character.name),
      'description': new UntypedFormControl(character.description),
      'group': new UntypedFormControl(character.group),
      'groupType': new UntypedFormControl(character.groupType),
      'status': new UntypedFormControl(character.status),
      'characteristics': formArrays.characteristics,
      'skills': formArrays.skills,
      'talents': formArrays.talents,
      'traits': formArrays.traits,
      'isRightHanded': new UntypedFormControl(this.isRightHanded),
      'weapons': formArrays.weapons,
      'armors': formArrays.armors,
      'injuries': formArrays.injuries,
      'notes': formArrays.notes,
      'conditions': formArrays.conditions,
      'spells': formArrays.spells
    })
  }

  onSubmit() {
    let character = this.createCharacter()
    if (this.editMode) {
      character.id = this.id
    }
    if (this.copyMode) {
      character.id = 0
      character.clearIds()
    }
    character.type = 'BASE'
    this.characterService.storeCharacter(character).then(() => {
      this.onCancel()
    })
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  createCharacter() {
    const name = this.editCharacterForm.value.name
    const description = this.editCharacterForm.value.description
    const groupType = this.editCharacterForm.value.groupType
    const group = this.editCharacterForm.value.group
    const status = this.editCharacterForm.value.status
    const characteristics = <CharacterCharacteristic[]>this.editCharacterForm.value.characteristics
    const skills = <ValueModel<Model>[]>this.editCharacterForm.value.skills
    const talents = <ValueModel<Talent>[]>this.editCharacterForm.value.talents
    const traits = <ValueModel<Trait>[]>this.editCharacterForm.value.traits
    const isRightHanded = this.editCharacterForm.value.isRightHanded
    const weapons = <CharacterWeapon[]>this.editCharacterForm.value.weapons
    const armors = <Armor[]>this.editCharacterForm.value.armors
    const conditions = <CharacterCondition[]>this.editCharacterForm.value.conditions
    const notes = <Note[]>this.editCharacterForm.value.notes
    const spells = <Spell[]>this.editCharacterForm.value.spells

    const character = new Character(
      name,
      description,
      groupType,
      group,
      status,
      characteristics,
      skills,
      talents,
      traits,
      isRightHanded,
      weapons,
      armors,
      conditions,
      notes,
      spells
    )

    this.prepareCharacterBodyLocalizations(character)

    return character
  }

  protected prepareCharacterBodyLocalizations(character: Character) {
    const head = new CharacterBodyLocalization(BodyLocalizationList.head, 0, 0, [])
    const rightArm = new CharacterBodyLocalization(BodyLocalizationList.rightArm, 0, 0, [])
    const leftArm = new CharacterBodyLocalization(BodyLocalizationList.leftArm, 0, 0, [])
    const body = new CharacterBodyLocalization(BodyLocalizationList.body, 0, 0, [])
    const rightLeg = new CharacterBodyLocalization(BodyLocalizationList.rightLeg, 0, 0, [])
    const leftLeg = new CharacterBodyLocalization(BodyLocalizationList.leftLeg, 0, 0, [])
    character.bodyLocalizations = []
    character.bodyLocalizations.push(head, leftArm, rightArm, body, leftLeg, rightLeg)

    for (let armor of character.armors) {
      for (let armorBodyLocalization of armor.armorBodyLocalizations) {
        for (let characterBodyLocalization of character.bodyLocalizations) {
          if (armorBodyLocalization.bodyLocalization.name === characterBodyLocalization.bodyLocalization.name) {
            characterBodyLocalization.armorPoints += armorBodyLocalization.armorPoints
            break
          }
        }
      }
    }

    for (let characterBodyLocalization of character.bodyLocalizations) {
      characterBodyLocalization.injuries = []
      for (let injury of this.injuries) {
        if (injury.value.bodyLocalization.name === characterBodyLocalization.bodyLocalization.name) {
          let characterInjury = new ValueModel<Model>
          characterInjury.value = injury.value.value
          characterInjury.model = injury.value.model
          characterBodyLocalization.injuries.push(characterInjury)
        }
      }
    }
  }

  protected prepareEditData(character: Character, formArrays: CharacterFormArraysWrapper) {
    if (character.skills) {
      this.prepareSkillsList(formArrays.skills, character.skills)
    }
    if (character.talents) {
      this.prepareTalentsList(formArrays.talents, character.talents)
    }
    if (character.traits) {
      this.prepareTraitsList(formArrays.traits, character.traits)
    }
    if (character.weapons) {
      WeaponsEditComponent.prepareWeaponsList(formArrays.weapons, character.weapons)
    }
    if (character.armors) {
      ArmorEditComponent.prepareArmorList(formArrays.armors, character.armors)
    }
    if (character.notes) {
      NotesEditComponent.prepareNotesList(formArrays.notes, character.notes)
    }
    this.prepareInjuriesList(formArrays.injuries, character.bodyLocalizations)
    ConditionsEditComponent.prepareConditionsList(formArrays.conditions, character.conditions)
    SpellsEditComponent.prepareSpellsList(formArrays.spells, character.spells)
  }

  private prepareSkillsList(skills: FormArray, skillsList: ValueModel<Model>[]) {
    for (let characterSkill of skillsList) {
      skills.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(characterSkill.id),
          'model': new UntypedFormControl(characterSkill.model),
          'value': new UntypedFormControl(characterSkill.value),
        })
      );
    }
  }

  private prepareTalentsList(talents: FormArray, talentsList: ValueModel<Talent>[]) {
    for (let characterTalent of talentsList) {
      talents.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(characterTalent.id),
          'model': new UntypedFormControl(characterTalent.model),
          'value': new UntypedFormControl(characterTalent.value),
        })
      );
    }
  }

  private prepareTraitsList(traits: UntypedFormArray, traitsList: ValueModel<Trait>[]) {
    for (let trait of traitsList) {

      let value = new UntypedFormControl(trait.value)
      if (!trait.model.hasValue) {
        value.disable()
      }

      traits.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(trait.id),
          'model': new UntypedFormControl(trait.model),
          'value': value,
        })
      )
    }
  }

  private prepareInjuriesList(injuries: UntypedFormArray, bodyLocalizations: CharacterBodyLocalization[]) {
    for (let bodyLocalization of bodyLocalizations) {
      for (let injury of bodyLocalization.injuries) {
        injuries.push(
          new UntypedFormGroup({
            'id': new UntypedFormControl(injury.id),
            'model': new UntypedFormControl(injury.model),
            'bodyLocalization': new UntypedFormControl(bodyLocalization.bodyLocalization),
            'value': new UntypedFormControl(injury.value)
          })
        )
      }
    }
  }

  getCharacter() {
    return <Character>this.characterService.getCharacter(this.id)
  }

  get characteristics() {
    return (<UntypedFormArray>this.editCharacterForm.get('characteristics')).controls
  }

  get skills() {
    return (<UntypedFormArray>this.editCharacterForm.get('skills')).controls
  }

  get talents() {
    return (<UntypedFormArray>this.editCharacterForm.get('talents')).controls
  }

  get traits() {
    return (<UntypedFormArray>this.editCharacterForm.get('traits')).controls
  }

  get spells() {
    return <UntypedFormControl[]>(<UntypedFormArray>this.editCharacterForm.get('spells')).controls
  }

  get weapons() {
    return <UntypedFormControl[]>(<UntypedFormArray>this.editCharacterForm.get('weapons')).controls
  }

  get armors() {
    return <UntypedFormControl[]>(<UntypedFormArray>this.editCharacterForm.get('armors')).controls
  }

  get injuries() {
    return <UntypedFormControl[]>(<UntypedFormArray>this.editCharacterForm.get('injuries')).controls
  }

  get conditions() {
    return <UntypedFormControl[]>(<UntypedFormArray>this.editCharacterForm.get('conditions')).controls
  }

  get notes() {
    return (<UntypedFormArray>this.editCharacterForm.get('notes')).controls
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.onSubmit()
    }
    if (event.key == 'Escape') {
      this.onCancel()
    }
  }
}
