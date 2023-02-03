import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {WeaponService} from "../../shared/services/weapon-service/weapon.service";
import {WeaponGroup} from "../../model/weapon/weapons-group.model";

@Component({
  selector: 'app-weapon-list',
  templateUrl: './weapon-list.component.html',
  styleUrls: ['./weapon-list.component.css']
})
export class WeaponListComponent implements OnInit {
  subscription!: Subscription
  weaponTypes: string[] = []

  constructor(public weaponService: WeaponService) {
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

}
