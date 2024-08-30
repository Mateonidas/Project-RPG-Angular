import {Component, Input, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  UntypedFormArray,
  UntypedFormControl
} from "@angular/forms";
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {Model} from "../../../../core/model/model";
import {Armor} from "../../../../core/model/armor/armor.model";
import {ArmorService} from "../../../../core/services/armor-service/armor.service";
import {EditArmorDialog} from "../../dialog-window/edit-armor-dialog/edit-armor-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CharacterArmor} from "../../../../core/model/armor/character-armor.model";

@Component({
  selector: 'app-armor-edit',
  templateUrl: './armor-edit.component.html',
  styleUrls: ['./armor-edit.component.css']
})
export class ArmorEditComponent implements OnInit {
  @Input() editCharacterForm!: FormGroup
  text = TextResourceService

  armorsList: Armor[] = []

  constructor(public armorService: ArmorService,
              public dialog: MatDialog,
              private fb: FormBuilder) {
    this.armorsList = this.armorService.armorsList
  }

  ngOnInit(): void {
    this.armorsList = this.armorService.armorsList
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

  static prepareArmorList(armorsForms: UntypedFormArray, characterArmors: CharacterArmor[]) {
    for (let characterArmor of characterArmors) {
      armorsForms.push(
        new FormGroup({
          'id': new UntypedFormControl(characterArmor.id),
          'armor': new UntypedFormControl(characterArmor.armor),
          'armorBodyLocalizations': new UntypedFormControl(characterArmor.armorBodyLocalizations),
          'armorPoints': new UntypedFormControl(characterArmor.armorBodyLocalizations[0].armorPoints),
          'duration': new UntypedFormControl(characterArmor.duration)
        })
      )
    }
  }

  onAddArmor() {
    (<UntypedFormArray>this.editCharacterForm.get('armors')).push(this.fb.group({
      'id': [null],
      'armor': [null],
      'armorBodyLocalizations': [null],
      'armorPoints': [null],
      'duration': [null]
    }));
  }

  onDeleteArmor(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('armors')).removeAt(index)
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2
  }

  get armors() {
    return <UntypedFormControl[]>(<UntypedFormArray>this.editCharacterForm.get('armors')).controls
  }

  onChangeArmor() {
  }

  isMagicalArmor(index: number): boolean {
    const armor = (this.editCharacterForm.get('armors') as FormArray).at(index).value;
    return armor.armor != null && armor.armor.armorType.name === 'MAGICAL';
  }
}
