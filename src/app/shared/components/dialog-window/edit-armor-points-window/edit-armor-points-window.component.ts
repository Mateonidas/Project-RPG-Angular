import {Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CharacterArmor} from "../../../../core/model/armor/character-armor.model";
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {ArmorBodyLocalization} from "../../../../core/model/body-localization/armor-body-localization.model";

@Component({
    selector: 'app-edit-armor-points-window',
    templateUrl: './edit-armor-points-window.component.html',
    styleUrls: ['./edit-armor-points-window.component.css'],
    standalone: false
})
export class EditArmorPointsWindowComponent {
  form!: FormGroup;
  protected readonly text = TextResourceService;

  constructor(public dialogRef: MatDialogRef<EditArmorPointsWindowComponent>,
              @Inject(MAT_DIALOG_DATA) public armor: CharacterArmor,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([])
    });

    this.populateForm();
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  populateForm() {
    this.armor.armorBodyLocalizations.forEach(item => {
      this.items.push(this.formBuilder.group({
        id: item.id,
        bodyLocalization: this.formBuilder.group({
          id: item.bodyLocalization.id,
          name: item.bodyLocalization.name,
          nameTranslation: item.bodyLocalization.nameTranslation
        }),
        armorPoints: item.armorPoints
      }));
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.armor.armorBodyLocalizations = <ArmorBodyLocalization[]>this.items.value
      this.dialogRef.close(this.armor)
    }
  }
}
