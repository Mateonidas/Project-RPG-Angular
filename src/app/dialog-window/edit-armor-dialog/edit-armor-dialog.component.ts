import {Component, Inject, OnInit} from '@angular/core';
import {Armor} from "../../model/armor/armor.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ArmorService} from "../../shared/services/armor-service/armor.service";
import {ArmorBodyLocalization} from "../../model/body-localization/armor-body-localization.model";
import {BodyLocalizationService} from "../../shared/services/body-localization-service/body-localization.service";
import {Model} from "../../model/model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";

@Component({
  selector: 'app-edit-armor-dialog',
  templateUrl: './edit-armor-dialog.component.html',
  styleUrls: ['./edit-armor-dialog.component.css']
})
export class EditArmorDialog implements OnInit {

  form!: FormGroup;
  modifiedArmor = new Armor();
  text = TextResourceService;

  constructor(public dialogRef: MatDialogRef<EditArmorDialog>,
              @Inject(MAT_DIALOG_DATA) public armor: Armor,
              public armorService: ArmorService,
              public bodyLocalizationService: BodyLocalizationService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    Object.assign(this.modifiedArmor, this.armor);
    this.form = new FormGroup({
      'name': new FormControl(this.modifiedArmor.name),
      'nameTranslation': new FormControl(this.modifiedArmor.nameTranslation),
      'armorCategory': new FormControl(this.modifiedArmor.armorCategory),
      'armorBodyLocalizations': this.prepareArmorBodyLocalizationsList(this.modifiedArmor.armorBodyLocalizations),
      'armorPenalties': this.prepareArmorPenaltiesList(this.modifiedArmor.armorPenalties),
      'armorQualities': this.prepareArmorQualitiesList(this.modifiedArmor.armorQualities)
    });
  }

  prepareArmorBodyLocalizationsList(armorBodyLocalizationsList: ArmorBodyLocalization[]) {
    let armorBodyLocalizations = new FormArray([]);

    for (let armorBodyLocalization of armorBodyLocalizationsList) {
      armorBodyLocalizations.push(
        new FormGroup({
          'bodyLocalization': new FormControl(armorBodyLocalization.bodyLocalization),
          'armorPoints': new FormControl(armorBodyLocalization.armorPoints),
          'brokenArmorPoints': new FormControl(armorBodyLocalization.brokenArmorPoints)
        })
      )
    }

    return armorBodyLocalizations;
  }

  prepareArmorPenaltiesList(armorPenaltiesList: Model[]) {
    let armorPenalties = new FormArray([])

    for (let armorPenalty of armorPenaltiesList) {
      armorPenalties.push(
        new FormControl(armorPenalty)
      );
    }

    return armorPenalties;
  }

  prepareArmorQualitiesList(armorQualitiesList: Model[]) {
    let armorQualities = new FormArray([])

    for (let armorQuality of armorQualitiesList) {
      armorQualities.push(
        new FormControl(armorQuality)
      );
    }

    return armorQualities;
  }

  onAddBodyLocalization() {
    (<FormArray>this.form.get('armorBodyLocalizations')).push(
      new FormGroup({
        'bodyLocalization': new FormControl(null),
        'armorPoints': new FormControl(null),
        'brokenArmorPoints': new FormControl(null)
      })
    );
  }

  onAddArmorPenalty() {
    (<FormArray>this.form.get('armorPenalties')).push(
      new FormControl(null)
    );
  }

  onAddArmorQuality() {
    (<FormArray>this.form.get('armorQualities')).push(
      new FormControl(null)
    );
  }

  onSave() {
    let armor: Armor;
    if (this.form.value.name != this.armor.name || this.form.value.nameTranslation != this.armor.nameTranslation) {
      this.modifyArmor(this.modifiedArmor);
      armor = this.modifiedArmor;
      armor.id = undefined;
    } else {
      this.modifyArmor(this.armor);
      armor = this.armor;
    }

    this.dialogRef.close(armor);
  }

  modifyArmor(armor: Armor) {
    armor.name = this.form.value.name;
    armor.nameTranslation = this.form.value.nameTranslation;
    armor.armorCategory = this.form.value.armorCategory;
    armor.armorBodyLocalizations = <ArmorBodyLocalization[]>this.form.value.armorBodyLocalizations;
    armor.armorPenalties = <Model[]>this.form.value.armorPenalties;
    armor.armorQualities = <Model[]>this.form.value.armorQualities;
  }

  get armorBodyLocalizations() {
    return (<FormArray>this.form.get('armorBodyLocalizations')).controls;
  }

  get armorPenalties() {
    return <FormControl[]>(<FormArray>this.form.get('armorPenalties')).controls;
  }

  get armorQualities() {
    return <FormControl[]>(<FormArray>this.form.get('armorQualities')).controls;
  }

  onSetBodyLocalizations(event: any, i: number) {
    this.armorBodyLocalizations[i].value.value = event.target.value;
  }

  onDeleteArmorBodyLocalization(index: number) {
    (<FormArray>this.form.get('armorBodyLocalizations')).removeAt(index);
  }

  onDeleteArmorPenalty(index: number) {
    (<FormArray>this.form.get('armorPenalties')).removeAt(index);
  }

  onDeleteArmorQuality(index: number) {
    (<FormArray>this.form.get('armorQualities')).removeAt(index);
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }
}
