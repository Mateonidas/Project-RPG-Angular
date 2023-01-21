import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Weapon} from "../../model/weapon/weapon.model";
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {Model} from "../../model/model";
import {WeaponService} from "../../shared/services/weapon-service/weapon.service";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {WeaponQualityValue} from "../../model/weapon/weapon-quality-value.model";

@Component({
  selector: 'app-edit-weapon-dialog',
  templateUrl: './edit-weapon-dialog.component.html',
  styleUrls: ['./edit-weapon-dialog.component.css']
})
export class EditWeaponDialog implements OnInit {

  form!: UntypedFormGroup;
  modifiedWeapon = new Weapon();
  text = TextResourceService;

  constructor(public dialogRef: MatDialogRef<EditWeaponDialog>,
              @Inject(MAT_DIALOG_DATA) public weapon: Weapon,
              public weaponService: WeaponService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    Object.assign(this.modifiedWeapon, this.weapon);
    this.form = new UntypedFormGroup({
      'name': new UntypedFormControl(this.modifiedWeapon.name),
      'nameTranslation': new UntypedFormControl(this.modifiedWeapon.nameTranslation),
      'weaponType': new UntypedFormControl(this.modifiedWeapon.weaponType),
      'weaponGroup': new UntypedFormControl(this.modifiedWeapon.weaponGroup),
      'weaponReach': new UntypedFormControl(this.modifiedWeapon.weaponReach),
      'weaponRange': new UntypedFormControl(this.modifiedWeapon.weaponRange),
      'isUsingStrength': new UntypedFormControl(this.modifiedWeapon.isUsingStrength),
      'isUsingStrengthInRange': new UntypedFormControl(this.modifiedWeapon.isUsingStrengthInRange),
      'damage': new UntypedFormControl(this.modifiedWeapon.damage),
      'weaponQualities': this.prepareWeaponQualitiesList(this.weapon.weaponQualities)
    });
  }

  prepareWeaponQualitiesList(weaponQualitiesList: WeaponQualityValue[]) {
    let weaponQualities = new UntypedFormArray([]);

    for (let weaponQuality of weaponQualitiesList) {
      weaponQualities.push(
        new UntypedFormGroup({
          'quality': new UntypedFormControl(weaponQuality.weaponQuality),
          'value': new UntypedFormControl(weaponQuality.value)
        })
      )
    }

    return weaponQualities;
  }

  onAddWeaponQuality() {
    (<UntypedFormArray>this.form.get('weaponQualities')).push(
      new UntypedFormGroup({
        'quality': new UntypedFormControl(null),
        'value': new UntypedFormControl(0)
      })
    );
  }

  onDeleteWeaponQuality(index: number) {
    (<UntypedFormArray>this.form.get('weaponQualities')).removeAt(index);
  }

  get weaponQualities() {
    return (<UntypedFormArray>this.form.get('weaponQualities')).controls;
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }

  onSave() {
    let weapon: Weapon;
    if(this.form.value.name != this.weapon.name || this.form.value.nameTranslation != this.weapon.nameTranslation) {
      this.modifyWeapon(this.modifiedWeapon);
      weapon = this.modifiedWeapon;
      weapon.id = undefined;
    } else {
      this.modifyWeapon(this.weapon);
      weapon = this.weapon;
    }

    this.dialogRef.close(weapon);
  }

  private modifyWeapon(weapon: Weapon) {
    weapon.name = this.form.value.name;
    weapon.nameTranslation = this.form.value.nameTranslation;
    weapon.weaponType = this.form.value.weaponType;
    weapon.weaponGroup = this.form.value.weaponGroup;
    weapon.weaponReach = this.form.value.weaponReach;
    weapon.weaponRange = this.form.value.weaponRange;
    weapon.damage = this.form.value.damage;

    weapon.weaponQualities = [];
    for (let formWeaponQuality of this.form.value.weaponQualities) {
      let weaponQuality = new WeaponQualityValue(formWeaponQuality.quality, formWeaponQuality.value);
      weapon.weaponQualities.push(weaponQuality);
    }
  }

}
