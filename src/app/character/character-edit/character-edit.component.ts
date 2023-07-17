import {Component, HostListener, OnInit} from '@angular/core'
import {ActivatedRoute, Params, Router} from "@angular/router"
import {AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms"
import {CharacterService} from "../../shared/services/character-service/character.service"
import {Character} from "../../model/character/character.model"
import {CharacterFormArraysWrapper} from "../../model/character/character-form-arrays-wrapper.model"
import {ArmorService} from "../../shared/services/armor-service/armor.service"
import {WeaponService} from "../../shared/services/weapon-service/weapon.service"
import {SkillService} from "../../shared/services/skill-service/skill.service"
import {TalentService} from "../../shared/services/talent-service/talent.service"
import {CharacterCharacteristic} from "../../model/characteristic/character-characteristic.model"
import {CharacterSkill} from "../../model/skill/character-skill.model"
import {CharacterTalent} from "../../model/talent/character-talent.model"
import {Armor} from "../../model/armor/armor.model"
import {CharacterWeapon} from "../../model/weapon/character-weapon.model"
import {CharacterBodyLocalization} from "../../model/body-localization/character-body-localization.model"
import {BodyLocalizationList} from "../../model/body-localization/body-localization.model"
import {BodyLocalizationService} from "../../shared/services/body-localization-service/body-localization.service"
import {InjuryService} from "../../shared/services/injuries-service/injury.service"
import {CharacterInjury} from "../../model/injury/character-injury.model"
import {ConditionService} from "../../shared/services/condition-service/condition.service"
import {CharacterCondition} from "../../model/condition/character-condition.model"
import {MatDialog} from "@angular/material/dialog"
import {Skill} from "../../model/skill/skill.model"
import {Talent} from "../../model/talent/talent.model"
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service"
import {Characteristic} from "../../model/characteristic/characteristic.model"
import {Model} from "../../model/model"
import {EditArmorDialog} from "../../dialog-window/edit-armor-dialog/edit-armor-dialog.component"
import {EditWeaponDialog} from "../../dialog-window/edit-weapon-dialog/edit-weapon-dialog.component"
import {TraitService} from "../../shared/services/trait-service/trait.service"
import {Trait} from "../../model/trait/trait.model"
import {CharacterTrait} from "../../model/trait/character-trait.model"
import {WeaponGroup} from "../../model/weapon/weapons-group.model"
import {SpellService} from "../../shared/services/spell-service/spell.service"
import {SpellGroup} from "../../model/spell/spell-group.model"
import {Spell} from "../../model/spell/spell.model"
import {Note} from "../../model/note/note.model";

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent implements OnInit {

  isSkirmishMode = false
  editMode = false
  copyMode = false
  editCharacterForm!: UntypedFormGroup
  skillsList: Skill[] = []
  talentsList: Talent[] = []
  traitsList: Trait[] = []
  spellGroups: SpellGroup[] = []
  weaponGroups: WeaponGroup[] = []
  armorsList: Armor[] = []
  isRightHanded = true
  isDead!: boolean
  id!: number

  characterBodyLocalizations!: CharacterBodyLocalization[]

  characteristicsColumns: string[] = this.fillCharacteristicsColumn()
  text = TextResourceService

  constructor(public router: Router,
              public route: ActivatedRoute,
              public armorService: ArmorService,
              public weaponService: WeaponService,
              public skillService: SkillService,
              public talentService: TalentService,
              public traitService: TraitService,
              public bodyLocalizationService: BodyLocalizationService,
              public characterService: CharacterService,
              public injuryService: InjuryService,
              public conditionService: ConditionService,
              public spellService: SpellService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.armorsList = this.armorService.armorsList
    this.weaponGroups = this.weaponService.weaponGroups
    this.skillsList = this.skillService.skillList
    this.talentsList = this.talentService.talentList
    this.traitsList = this.traitService.traitList
    this.spellGroups = this.spellService.spellGroups
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
      formArrays.characteristics = CharacterEditComponent.initEditCharacteristicsTable(character)
      this.isRightHanded = character.isRightHanded
      this.prepareEditData(character, formArrays)
      this.characterBodyLocalizations = character.bodyLocalizations
    } else {
      character.name = ''
      character.description = ''
      formArrays.characteristics = CharacterEditComponent.initCharacteristicsTable()
    }

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

  protected static initCharacteristicsTable() {
    return new UntypedFormArray([
      new UntypedFormGroup({
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("MOVEMENT")),
        'value': new UntypedFormControl('')
      }),
      new UntypedFormGroup({
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("WEAPON_SKILL")),
        'value': new UntypedFormControl('')
      }),
      new UntypedFormGroup({
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("BALLISTIC_SKILL")),
        'value': new UntypedFormControl('')
      }),
      new UntypedFormGroup({
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("STRENGTH")),
        'value': new UntypedFormControl('')
      }),
      new UntypedFormGroup({
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("TOUGHNESS")),
        'value': new UntypedFormControl('')
      }),
      new UntypedFormGroup({
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("INITIATIVE")),
        'value': new UntypedFormControl('')
      }),
      new UntypedFormGroup({
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("AGILITY")),
        'value': new UntypedFormControl('')
      }),
      new UntypedFormGroup({
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("DEXTERITY")),
        'value': new UntypedFormControl('')
      }),
      new UntypedFormGroup({
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("INTELLIGENCE")),
        'value': new UntypedFormControl('')
      }),
      new UntypedFormGroup({
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("WILLPOWER")),
        'value': new UntypedFormControl('')
      }),
      new UntypedFormGroup({
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("FELLOWSHIP")),
        'value': new UntypedFormControl('')
      }),
      new UntypedFormGroup({
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("WOUNDS")),
        'value': new UntypedFormControl('')
      }),
    ])
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
      this.prepareSkillsList(formArrays.skills, character.skills)
    }
    if (character.talents) {
      this.prepareTalentsList(formArrays.talents, character.talents)
    }
    if (character.traits) {
      this.prepareTraitsList(formArrays.traits, character.traits)
    }
    if (character.weapons) {
      this.prepareWeaponsList(formArrays.weapons, character.weapons)
    }
    if (character.armors) {
      this.prepareArmorList(formArrays.armors, character.armors)
    }
    if (character.notes) {
      this.prepareNotesList(formArrays.notes, character.notes)
    }
    this.prepareInjuriesList(formArrays.injuries, character.bodyLocalizations)
    this.prepareConditionsList(formArrays.conditions, character.conditions)
    this.prepareSpellsList(formArrays.spells, character.spells)
  }

  prepareSkillsList(skills: UntypedFormArray, skillsList: CharacterSkill[]) {
    for (let characterSkill of skillsList) {
      skills.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(characterSkill.id),
          'skill': new UntypedFormControl(characterSkill.skill),
          'value': new UntypedFormControl(characterSkill.value),
        })
      )
    }
  }

  prepareTalentsList(talents: UntypedFormArray, talentsList: CharacterTalent[]) {
    for (let talent of talentsList) {
      talents.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(talent.id),
          'talent': new UntypedFormControl(talent.talent),
          'value': new UntypedFormControl(talent.value),
        })
      )
    }
  }

  prepareTraitsList(traits: UntypedFormArray, traitsList: CharacterTrait[]) {
    for (let trait of traitsList) {

      let value = new UntypedFormControl(trait.value)
      if (!trait.trait.hasValue) {
        value.disable()
      }

      traits.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(trait.id),
          'trait': new UntypedFormControl(trait.trait),
          'value': value,
        })
      )
    }
  }

  prepareWeaponsList(weapons: UntypedFormArray, weaponsList: CharacterWeapon[]) {
    for (let weapon of weaponsList) {
      weapons.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(weapon.id),
          'weapon': new UntypedFormControl(weapon.weapon),
          'value': new UntypedFormControl(weapon.value)
        })
      )
    }
  }

  prepareArmorList(armorsForms: UntypedFormArray, characterArmors: Armor[]) {
    for (let armor of characterArmors) {
      armorsForms.push(
        new UntypedFormControl(armor)
      )
    }
  }

  prepareNotesList(notes: UntypedFormArray, notesList: Note[]) {
    for (let note of notesList) {
      notes.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(note.id),
          'note': new UntypedFormControl(note.note),
        })
      )
    }
  }

  prepareInjuriesList(injuries: UntypedFormArray, bodyLocalizations: CharacterBodyLocalization[]) {
    for (let bodyLocalization of bodyLocalizations) {
      for (let injury of bodyLocalization.injuries) {
        injuries.push(
          new UntypedFormGroup({
            'id': new UntypedFormControl(injury.id),
            'injury': new UntypedFormControl(injury.injury),
            'bodyLocalization': new UntypedFormControl(bodyLocalization.bodyLocalization),
            'value': new UntypedFormControl(injury.value)
          })
        )
      }
    }
  }

  prepareConditionsList(conditions: UntypedFormArray, conditionsList: CharacterCondition[]) {
    for (let characterCondition of conditionsList) {

      let counter = new UntypedFormControl(characterCondition.counter)
      if (!characterCondition.condition.hasCounter) {
        counter.disable()
      }

      conditions.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(characterCondition.id),
          'condition': new UntypedFormControl(characterCondition.condition),
          'value': new UntypedFormControl(characterCondition.value),
          'counter': counter
        })
      )
    }
  }

  prepareSpellsList(spells: UntypedFormArray, spellsList: Spell[]) {
    for (let spell of spellsList) {
      spells.push(
        new UntypedFormControl(spell)
      )
    }
  }

  protected static initEditCharacteristicsTable(character: Character) {
    return new UntypedFormArray([
      new UntypedFormGroup({
        'id': new UntypedFormControl(character.movement.id),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("MOVEMENT")),
        'value': new UntypedFormControl(character.movement.value)
      }),
      new UntypedFormGroup({
        'id': new UntypedFormControl(character.weaponSkill.id),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("WEAPON_SKILL")),
        'value': new UntypedFormControl(character.weaponSkill.value)
      }),
      new UntypedFormGroup({
        'id': new UntypedFormControl(character.ballisticSkill.id),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("BALLISTIC_SKILL")),
        'value': new UntypedFormControl(character.ballisticSkill.value)
      }),
      new UntypedFormGroup({
        'id': new UntypedFormControl(character.strength.id),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("STRENGTH")),
        'value': new UntypedFormControl(character.strength.value)
      }),
      new UntypedFormGroup({
        'id': new UntypedFormControl(character.toughness.id),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("TOUGHNESS")),
        'value': new UntypedFormControl(character.toughness.value)
      }),
      new UntypedFormGroup({
        'id': new UntypedFormControl(character.initiative.id),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("INITIATIVE")),
        'value': new UntypedFormControl(character.initiative.value)
      }),
      new UntypedFormGroup({
        'id': new UntypedFormControl(character.agility.id),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("AGILITY")),
        'value': new UntypedFormControl(character.agility.value)
      }),
      new UntypedFormGroup({
        'id': new UntypedFormControl(character.dexterity.id),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("DEXTERITY")),
        'value': new UntypedFormControl(character.dexterity.value)
      }),
      new UntypedFormGroup({
        'id': new UntypedFormControl(character.intelligence.id),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("INTELLIGENCE")),
        'value': new UntypedFormControl(character.intelligence.value)
      }),
      new UntypedFormGroup({
        'id': new UntypedFormControl(character.willpower.id),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("WILLPOWER")),
        'value': new UntypedFormControl(character.willpower.value)
      }),
      new UntypedFormGroup({
        'id': new UntypedFormControl(character.fellowship.id),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("FELLOWSHIP")),
        'value': new UntypedFormControl(character.fellowship.value)
      }),
      new UntypedFormGroup({
        'id': new UntypedFormControl(character.wounds.id),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic("WOUNDS")),
        'value': new UntypedFormControl(character.wounds.value)
      }),
    ])
  }

  protected static prepareCharacteristic(name: string) {
    return new Characteristic(name, TextResourceService.getCharacteristicNameTranslation(name).nameTranslation)
  }

  checkIfTraitHasValue(traitControl: AbstractControl) {
    if (traitControl.value.trait != null && !traitControl.value.trait.hasValue) {
      (<UntypedFormGroup>traitControl.get('value')).disable()
    } else {
      (<UntypedFormGroup>traitControl.get('value')).enable()
    }
  }

  checkIfConditionHasCounter(conditionControl: AbstractControl) {
    if (conditionControl.value.condition.hasCounter != null && !conditionControl.value.condition.hasCounter) {
      (<UntypedFormGroup>conditionControl.get('counter')).disable()
    } else {
      (<UntypedFormGroup>conditionControl.get('counter')).enable()
    }
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2
  }

  onAddSkill() {
    (<UntypedFormArray>this.editCharacterForm.get('skills')).push(
      new UntypedFormGroup({
        'skill': new UntypedFormControl(null),
        'value': new UntypedFormControl(null),
      })
    )
  }

  onAddTalent() {
    (<UntypedFormArray>this.editCharacterForm.get('talents')).push(
      new UntypedFormGroup({
        'talent': new UntypedFormControl(null),
        'value': new UntypedFormControl(1),
      })
    )
  }

  onAddTrait() {
    (<UntypedFormArray>this.editCharacterForm.get('traits')).push(
      new UntypedFormGroup({
        'trait': new UntypedFormControl(null),
        'value': new UntypedFormControl(1),
      })
    )
  }

  onAddSpell() {
    (<UntypedFormArray>this.editCharacterForm.get('spells')).push(
      new UntypedFormControl(null),
    )
  }

  onAddWeapon() {
    (<UntypedFormArray>this.editCharacterForm.get('weapons')).push(
      new UntypedFormGroup({
        'weapon': new UntypedFormControl(null),
        'value': new UntypedFormControl(1),
      })
    )
  }

  onAddArmor() {
    (<UntypedFormArray>this.editCharacterForm.get('armors')).push(
      new UntypedFormControl(null),
    )
  }

  onAddInjury() {
    (<UntypedFormArray>this.editCharacterForm.get('injuries')).push(
      new UntypedFormGroup({
        'injury': new UntypedFormControl(null),
        'bodyLocalization': new UntypedFormControl(null),
        'value': new UntypedFormControl(1),
      })
    )
  }

  onAddCondition() {
    (<UntypedFormArray>this.editCharacterForm.get('conditions')).push(
      new UntypedFormGroup({
        'condition': new UntypedFormControl(null),
        'value': new UntypedFormControl(1),
        'counter': new UntypedFormControl({value: null, disabled: true})
      })
    )
  }

  onAddNote() {
    (<UntypedFormArray>this.editCharacterForm.get('notes')).push(
      new UntypedFormGroup({
        'id': new UntypedFormControl(null),
        'note': new UntypedFormControl(null),
      })
    )
  }

  async onEditArmor(index: number) {
    await this.createEditArmorDialogWindow(index)
    this.armorsList = this.armorService.armorsList
  }

  createEditArmorDialogWindow(index: number) {
    const dialogRef = this.dialog.open(EditArmorDialog, {
      width: '30%',
      data: (<UntypedFormControl>this.armors[index]).value,
    })

    dialogRef.afterClosed().subscribe(armor => {
      if (armor != undefined) {
        this.armorService.storeArmor(armor).then(() => {
          if (armor != null) {
            this.armorsList = this.armorService.armorsList
            return Promise.resolve({armor: armor})
          } else {
            return Promise.resolve({armor: (<UntypedFormControl>this.armors[index]).value})
          }
        })
      }
    })
  }

  async onEditWeapon(index: number) {
    await this.createEditWeaponDialog(index)
    this.weaponGroups = this.weaponService.weaponGroups
  }

  createEditWeaponDialog(index: number) {
    const dialogRef = this.dialog.open(EditWeaponDialog, {
      width: '30%',
      data: (<UntypedFormControl>this.weapons[index]).value.weapon,
    })

    dialogRef.afterClosed().subscribe(weapon => {
      if (weapon != undefined) {
        this.weaponService.storeWeapon(weapon).then(() => {
          if (weapon != null) {
            this.weaponGroups = this.weaponService.weaponGroups
            return Promise.resolve({weapon: weapon})
          } else {
            return Promise.resolve({weapon: (<UntypedFormControl>this.weapons[index]).value})
          }
        })
      }
    })
  }

  protected fillCharacteristicsColumn() {
    return [
      "MOVEMENT",
      "WEAPON_SKILL",
      "BALLISTIC_SKILL",
      "STRENGTH",
      "TOUGHNESS",
      "INITIATIVE",
      "AGILITY",
      "DEXTERITY",
      "INTELLIGENCE",
      "WILLPOWER",
      "FELLOWSHIP",
      "WOUNDS"
    ]
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

  onDeleteSkill(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('skills')).removeAt(index)
  }

  onDeleteTalent(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('talents')).removeAt(index)
  }

  onDeleteTrait(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('traits')).removeAt(index)
  }

  onDeleteSpell(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('spells')).removeAt(index)
  }

  onDeleteWeapon(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('weapons')).removeAt(index)
  }

  onDeleteArmor(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('armors')).removeAt(index)
  }

  onDeleteInjury(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('injuries')).removeAt(index)
  }

  onDeleteCondition(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('conditions')).removeAt(index)
  }

  onDeleteNote(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('notes')).removeAt(index)
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
