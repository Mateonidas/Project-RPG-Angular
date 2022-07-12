import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Weapon} from "../../model/weapon/weapon.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {WeaponService} from "../../shared/services/weapon-service/weapon.service";
import {WeaponQuality} from "../../model/weapon/weapon-quality.model";
import {Model} from "../../model/model";

@Component({
  selector: 'app-edit-weapon-dialog-window',
  templateUrl: './edit-weapon-dialog-window.component.html',
  styleUrls: ['./edit-weapon-dialog-window.component.css']
})
export class EditWeaponDialogWindowComponent implements OnInit {

  @Input() weapon!: Weapon;
  @Output() emitter = new EventEmitter<{weapon: Weapon}>();
  form!: FormGroup;
  modifiedWeapon = new Weapon();

  constructor(public activeModal: NgbActiveModal,
              public weaponService: WeaponService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    Object.assign(this.modifiedWeapon, this.weapon);
    this.form = new FormGroup({
      'name': new FormControl(this.modifiedWeapon.name),
      'nameTranslation': new FormControl(this.modifiedWeapon.nameTranslation),
      'weaponType': new FormControl(this.modifiedWeapon.weaponType),
      'weaponGroup': new FormControl(this.modifiedWeapon.weaponGroupType),
      'weaponReach': new FormControl(this.modifiedWeapon.weaponReach),
      'weaponRange': new FormControl(this.modifiedWeapon.weaponRange),
      'isUsingStrength': new FormControl(this.modifiedWeapon.isUsingStrength),
      'isUsingStrengthInRange': new FormControl(this.modifiedWeapon.isUsingStrengthInRange),
      'damage': new FormControl(this.modifiedWeapon.damage),
      'weaponQualities': this.prepareWeaponQualitiesList(this.weapon.weaponQualities)
    });
  }

  prepareWeaponQualitiesList(weaponQualitiesList: WeaponQuality[]) {
    let weaponQualities = new FormArray([]);

    for (let weaponQuality of weaponQualitiesList) {
      weaponQualities.push(
        new FormGroup({
          'quality': new FormControl(weaponQuality),
          'value': new FormControl(weaponQuality.value)
        })
      )
    }

    return weaponQualities;
  }

  onAddWeaponQuality() {
    (<FormArray>this.form.get('weaponQualities')).push(
      new FormGroup({
        'quality': new FormControl(null),
        'value': new FormControl(0)
      })
    );
  }

  onDeleteWeaponQuality(index: number) {
    (<FormArray>this.form.get('weaponQualities')).removeAt(index);
  }

  get weaponQualities() {
    return (<FormArray>this.form.get('weaponQualities')).controls;
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

    this.weaponService.storeWeapon(weapon).then(() => {
      this.emitter.emit({weapon: weapon});
      this.activeModal.close('Close click');
    })
  }

  private modifyWeapon(weapon: Weapon) {
    weapon.name = this.form.value.name;
    weapon.nameTranslation = this.form.value.nameTranslation;
    weapon.weaponType = this.form.value.weaponType;
    weapon.weaponGroupType = this.form.value.weaponGroup;
    weapon.weaponReach = this.form.value.weaponReach;
    weapon.weaponRange = this.form.value.weaponRange;
    weapon.damage = this.form.value.damage;

    weapon.weaponQualities = [];
    for (let formWeaponQuality of this.form.value.weaponQualities) {
      let weaponQuality = new WeaponQuality(formWeaponQuality.quality.name, formWeaponQuality.value);
      weapon.weaponQualities.push(weaponQuality);
    }
  }
}
