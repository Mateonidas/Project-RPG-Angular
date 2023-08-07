import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, UntypedFormArray, UntypedFormControl} from "@angular/forms";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {Model} from "../../model/model";
import {Armor} from "../../model/armor/armor.model";
import {ArmorService} from "../../shared/services/armor-service/armor.service";
import {EditArmorDialog} from "../../dialog-window/edit-armor-dialog/edit-armor-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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
              public dialog: MatDialog) {
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

  static prepareArmorList(armorsForms: UntypedFormArray, characterArmors: Armor[]) {
    for (let armor of characterArmors) {
      armorsForms.push(
        new UntypedFormControl(armor)
      )
    }
  }

  onAddArmor() {
    (<UntypedFormArray>this.editCharacterForm.get('armors')).push(
      new UntypedFormControl(null),
    )
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
}
