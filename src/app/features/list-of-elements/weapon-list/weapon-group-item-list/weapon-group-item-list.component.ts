import {Component, OnInit, ViewChild} from '@angular/core';
import {WeaponGroup} from "../../../../core/model/weapon/weapons-group.model";
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {ActivatedRoute, Params} from "@angular/router";
import {WeaponService} from "../../../../core/services/weapon-service/weapon.service";
import {MatMenuTrigger} from "@angular/material/menu";
import {Weapon} from "../../../../core/model/weapon/weapon.model";
import {
  EditWeaponDialog
} from "../../../../shared/components/dialog-window/edit-weapon-dialog/edit-weapon-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationDialogComponent
} from "../../../../shared/components/dialog-window/confirmation-dialog/confirmation-dialog.component";

@Component({
    selector: 'app-weapon-group-item-list',
    templateUrl: './weapon-group-item-list.component.html',
    styleUrls: ['./weapon-group-item-list.component.css'],
    standalone: false
})
export class WeaponGroupItemListComponent implements OnInit {
  name!: string
  weaponGroup!: WeaponGroup
  weaponGroups!: WeaponGroup[]
  text = TextResourceService
  filterValue?: string;

  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  constructor(private route: ActivatedRoute,
              private weaponService: WeaponService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.name = params['name'];
        this.groupWeaponCategories(this.weaponService.getWeaponGroups())
      }
    )
  }

  groupWeaponCategories(weaponGroups: WeaponGroup[]) {
    weaponGroups.sort((a, b) => a.name.localeCompare(b.name));
    this.weaponGroups = weaponGroups.filter(g => g.type === this.name)
  }

  async onEditWeapon(weapon: Weapon) {
    await this.createEditWeaponDialog(weapon);
  }

  createEditWeaponDialog(weapon: Weapon) {
    const dialogRef = this.dialog.open(EditWeaponDialog, {
      width: '30%',
      data: weapon,
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

  onDeleteWeapon(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.weaponService.removeWeapon(id).then(() => {
          this.groupWeaponCategories(this.weaponService.getWeaponGroups())
        });
      }
    });
  }

  applyFilter(newFilterValue: string) {
    this.filterValue = newFilterValue;
  }
}
