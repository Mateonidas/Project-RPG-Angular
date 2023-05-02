import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {WeaponService} from "../../shared/services/weapon-service/weapon.service";
import {WeaponGroup} from "../../model/weapon/weapons-group.model";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {Weapon} from "../../model/weapon/weapon.model";
import {EditWeaponDialog} from "../../dialog-window/edit-weapon-dialog/edit-weapon-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-weapon-list',
  templateUrl: './weapon-list.component.html',
  styleUrls: ['./weapon-list.component.css']
})
export class WeaponListComponent implements OnInit {
  subscription!: Subscription
  weaponTypes: string[] = []

  text = TextResourceService

  constructor(public weaponService: WeaponService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscription = this.weaponService.weaponGroupsChanged.subscribe(
      (weaponGroups: WeaponGroup[]) => {
        this.groupWeaponCategories(weaponGroups);
      }
    )
    this.groupWeaponCategories(this.weaponService.getWeaponGroups());
  }

  groupWeaponCategories(weaponGroups: WeaponGroup[]) {
    this.weaponTypes = [];
    weaponGroups.sort((a, b) => a.name.localeCompare(b.name));
    weaponGroups.forEach(weaponGroup => {
      let weaponType = this.weaponTypes.find(weaponType => weaponType === weaponGroup.type);
      if (weaponType == undefined) {
        this.weaponTypes.push(weaponGroup.type);
      }
    })
  }

  async addWeapon() {
    await this.createEditWeaponDialog();
  }

  createEditWeaponDialog() {
    const dialogRef = this.dialog.open(EditWeaponDialog, {
      width: '30%',
      data: new Weapon(),
    });

    dialogRef.afterClosed().subscribe(weapon => {
      if (weapon != undefined) {
        this.weaponService.storeWeapon(weapon).then(() => {
          this.groupWeaponCategories(this.weaponService.getWeaponGroups())
          return Promise.resolve({weapon: weapon});
        })
      }
    })
  }
}
