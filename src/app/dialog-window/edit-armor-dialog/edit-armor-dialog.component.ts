import {Component, Inject, OnInit} from '@angular/core';
import {Armor} from "../../model/armor/armor.model";
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ArmorService} from "../../shared/services/armor-service/armor.service";
import {ArmorBodyLocalization} from "../../model/body-localization/armor-body-localization.model";
import {BodyLocalizationService} from "../../shared/services/body-localization-service/body-localization.service";
import {Model} from "../../model/model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {AvailabilityService} from "../../shared/services/availability-service/availability.service";

@Component({
  selector: 'app-edit-armor-dialog',
  templateUrl: './edit-armor-dialog.component.html',
  styleUrls: ['./edit-armor-dialog.component.css']
})
export class EditArmorDialog implements OnInit {

  form!: UntypedFormGroup;
  modifiedArmor = new Armor();
  text = TextResourceService;

  constructor(public dialogRef: MatDialogRef<EditArmorDialog>,
              @Inject(MAT_DIALOG_DATA) public armor: Armor,
              public armorService: ArmorService,
              public bodyLocalizationService: BodyLocalizationService,
              public availabilityService: AvailabilityService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    Object.assign(this.modifiedArmor, this.armor);
    this.form = new UntypedFormGroup({
      'name': new UntypedFormControl(this.modifiedArmor.name ?? null, Validators.required),
      'nameTranslation': new UntypedFormControl(this.modifiedArmor.nameTranslation ?? null, Validators.required),
      'armorCategory': new UntypedFormControl(this.modifiedArmor.armorCategory ?? this.armorService.armorCategoriesList[0]),
      'armorBodyLocalizations': this.prepareArmorBodyLocalizationsList(this.modifiedArmor.armorBodyLocalizations ?? []),
      'armorPenalties': this.prepareArmorPenaltiesList(this.modifiedArmor.armorPenalties ?? []),
      'armorQualities': this.prepareArmorQualitiesList(this.modifiedArmor.armorQualities ?? []),
      'price': new UntypedFormControl(this.modifiedArmor.price ?? null),
      'encumbrance': new UntypedFormControl(this.modifiedArmor.encumbrance ?? null),
      'availability': new UntypedFormControl(this.modifiedArmor.availability ?? this.availabilityService.availabilityList[0]),
    });
  }

  prepareArmorBodyLocalizationsList(armorBodyLocalizationsList: ArmorBodyLocalization[]) {
    let armorBodyLocalizations = new UntypedFormArray([]);

    for (let armorBodyLocalization of armorBodyLocalizationsList) {
      armorBodyLocalizations.push(
        new UntypedFormGroup({
          'bodyLocalization': new UntypedFormControl(armorBodyLocalization.bodyLocalization),
          'armorPoints': new UntypedFormControl(armorBodyLocalization.armorPoints, Validators.required),
        })
      )
    }

    return armorBodyLocalizations;
  }

  prepareArmorPenaltiesList(armorPenaltiesList: Model[]) {
    let armorPenalties = new UntypedFormArray([])

    for (let armorPenalty of armorPenaltiesList) {
      armorPenalties.push(
        new UntypedFormControl(armorPenalty)
      );
    }

    return armorPenalties;
  }

  prepareArmorQualitiesList(armorQualitiesList: Model[]) {
    let armorQualities = new UntypedFormArray([])

    for (let armorQuality of armorQualitiesList) {
      armorQualities.push(
        new UntypedFormControl(armorQuality)
      );
    }

    return armorQualities;
  }

  onAddBodyLocalization() {
    (<UntypedFormArray>this.form.get('armorBodyLocalizations')).push(
      new UntypedFormGroup({
        'bodyLocalization': new UntypedFormControl(null),
        'armorPoints': new UntypedFormControl(null, Validators.required),
        'additionalArmorPoints': new UntypedFormControl(null)
      })
    );
  }

  onAddArmorPenalty() {
    (<UntypedFormArray>this.form.get('armorPenalties')).push(
      new UntypedFormControl(null)
    );
  }

  onAddArmorQuality() {
    (<UntypedFormArray>this.form.get('armorQualities')).push(
      new UntypedFormControl(null)
    );
  }

  onSave() {
    if (this.form.valid) {
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
  }

  modifyArmor(armor: Armor) {
    armor.name = this.form.value.name;
    armor.nameTranslation = this.form.value.nameTranslation;
    armor.armorCategory = this.form.value.armorCategory;
    armor.armorBodyLocalizations = <ArmorBodyLocalization[]>this.form.value.armorBodyLocalizations;
    armor.armorPenalties = <Model[]>this.form.value.armorPenalties;
    armor.armorQualities = <Model[]>this.form.value.armorQualities;
    armor.price = this.form.value.price ?? '-';
    armor.encumbrance = this.form.value.encumbrance ?? '-';
    armor.availability = this.form.value.availability;
  }

  get armorBodyLocalizations() {
    return (<UntypedFormArray>this.form.get('armorBodyLocalizations')).controls;
  }

  get armorPenalties() {
    return <UntypedFormControl[]>(<UntypedFormArray>this.form.get('armorPenalties')).controls;
  }

  get armorQualities() {
    return <UntypedFormControl[]>(<UntypedFormArray>this.form.get('armorQualities')).controls;
  }

  onSetBodyLocalizations(event: any, i: number) {
    this.armorBodyLocalizations[i].value.value = event.target.value;
  }

  onDeleteArmorBodyLocalization(index: number) {
    (<UntypedFormArray>this.form.get('armorBodyLocalizations')).removeAt(index);
  }

  onDeleteArmorPenalty(index: number) {
    (<UntypedFormArray>this.form.get('armorPenalties')).removeAt(index);
  }

  onDeleteArmorQuality(index: number) {
    (<UntypedFormArray>this.form.get('armorQualities')).removeAt(index);
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }
}
