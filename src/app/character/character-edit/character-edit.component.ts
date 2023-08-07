import {Component, HostListener, OnInit} from '@angular/core'
import {ActivatedRoute, Params, Router} from "@angular/router"
import {FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms"
import {CharacterService} from "../../shared/services/character-service/character.service"
import {Character} from "../../model/character/character.model"
import {CharacterFormArraysWrapper} from "../../model/character/character-form-arrays-wrapper.model"
import {CharacterCharacteristic} from "../../model/characteristic/character-characteristic.model"
import {CharacterSkill} from "../../model/skill/character-skill.model"
import {CharacterTalent} from "../../model/talent/character-talent.model"
import {Armor} from "../../model/armor/armor.model"
import {CharacterWeapon} from "../../model/weapon/character-weapon.model"
import {CharacterBodyLocalization} from "../../model/body-localization/character-body-localization.model"
import {BodyLocalizationList} from "../../model/body-localization/body-localization.model"
import {CharacterInjury} from "../../model/injury/character-injury.model"
import {CharacterCondition} from "../../model/condition/character-condition.model"
import {MatDialog} from "@angular/material/dialog"
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service"
import {CharacterTrait} from "../../model/trait/character-trait.model"
import {Spell} from "../../model/spell/spell.model"
import {Note} from "../../model/note/note.model";
import {
  CharacteristicsEditComponent
} from "../../edit-form-components/characteristics-edit/characteristics-edit.component";
import {SkillsEditComponent} from "../../edit-form-components/skills-edit/skills-edit.component";
import {TalentsEditComponent} from "../../edit-form-components/talents-edit/talents-edit.component";
import {TraitsEditComponent} from "../../edit-form-components/traits-edit/traits-edit.component";
import {WeaponsEditComponent} from "../../edit-form-components/weapons-edit/weapons-edit.component";
import {ArmorEditComponent} from "../../edit-form-components/armor-edit/armor-edit.component";
import {NotesEditComponent} from "../../edit-form-components/notes-edit/notes-edit.component";
import {InjuryEditComponent} from "../../edit-form-components/injury-edit/injury-edit.component";
import {ConditionsEditComponent} from "../../edit-form-components/conditions-edit/conditions-edit.component";
import {SpellsEditComponent} from "../../edit-form-components/spells-edit/spells-edit.component";

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

  characterBodyLocalizations!: CharacterBodyLocalization[]
  text = TextResourceService

  constructor(public router: Router,
              public route: ActivatedRoute,
              public characterService: CharacterService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.copyMode = queryParams['copy'] == "true"
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
    }
    formArrays.characteristics = CharacteristicsEditComponent.initCharacteristicsTable(character.characteristics)
    this.createEditCharacterForm(character, formArrays)
  }

  createEditCharacterForm(character: Character, formArrays: CharacterFormArraysWrapper) {
    this.editCharacterForm = new UntypedFormGroup({
      'name': new UntypedFormControl(character.name),
      'description': new UntypedFormControl(character.description),
      'group': new UntypedFormControl(character.group),
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
    const group = this.editCharacterForm.value.group
    const status = this.editCharacterForm.value.status
    const characteristics = <CharacterCharacteristic[]>this.editCharacterForm.value.characteristics
    const skills = <CharacterSkill[]>this.editCharacterForm.value.skills
    const talents = <CharacterTalent[]>this.editCharacterForm.value.talents
    const traits = <CharacterTrait[]>this.editCharacterForm.value.traits
    const isRightHanded = this.editCharacterForm.value.isRightHanded
    const weapons = <CharacterWeapon[]>this.editCharacterForm.value.weapons
    const armors = <Armor[]>this.editCharacterForm.value.armors
    const conditions = <CharacterCondition[]>this.editCharacterForm.value.conditions
    const notes = <Note[]>this.editCharacterForm.value.notes
    const spells = <Spell[]>this.editCharacterForm.value.spells

    const character = new Character(
      name,
      description,
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
    if (this.characterBodyLocalizations == null || this.characterBodyLocalizations.length == 0) {
      const head = new CharacterBodyLocalization(BodyLocalizationList.head, 0, 0, [])
      const rightArm = new CharacterBodyLocalization(BodyLocalizationList.rightArm, 0, 0, [])
      const leftArm = new CharacterBodyLocalization(BodyLocalizationList.leftArm, 0, 0, [])
      const body = new CharacterBodyLocalization(BodyLocalizationList.body, 0, 0, [])
      const rightLeg = new CharacterBodyLocalization(BodyLocalizationList.rightLeg, 0, 0, [])
      const leftLeg = new CharacterBodyLocalization(BodyLocalizationList.leftLeg, 0, 0, [])
      character.bodyLocalizations = []
      character.bodyLocalizations.push(head, rightArm, leftArm, body, rightLeg, leftLeg)
    } else {
      character.bodyLocalizations = this.characterBodyLocalizations
      for (let bodyLocalization of character.bodyLocalizations) {
        bodyLocalization.armorPoints = 0
      }
    }

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
          let characterInjury = new CharacterInjury()
          characterInjury.value = injury.value.value
          characterInjury.injury = injury.value.injury
          characterBodyLocalization.injuries.push(characterInjury)
        }
      }
    }
  }

  protected prepareEditData(character: Character, formArrays: CharacterFormArraysWrapper) {
    if (character.skills) {
      SkillsEditComponent.prepareSkillsList(formArrays.skills, character.skills)
    }
    if (character.talents) {
      TalentsEditComponent.prepareTalentsList(formArrays.talents, character.talents)
    }
    if (character.traits) {
      TraitsEditComponent.prepareTraitsList(formArrays.traits, character.traits)
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
    InjuryEditComponent.prepareInjuriesList(formArrays.injuries, character.bodyLocalizations)
    ConditionsEditComponent.prepareConditionsList(formArrays.conditions, character.conditions)
    SpellsEditComponent.prepareSpellsList(formArrays.spells, character.spells)
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
