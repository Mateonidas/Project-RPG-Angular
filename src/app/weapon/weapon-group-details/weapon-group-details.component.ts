import {Component, OnInit, ViewChild} from '@angular/core';
import {WeaponGroup} from "../../model/weapon/weapons-group.model";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {WeaponService} from "../../shared/services/weapon-service/weapon.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Model} from "../../model/model";
import {
  BottomSheetDescription
} from "../../shared/bottom-sheet/bottom-sheet-description/bottom-sheet-description.component";
import {MatMenuTrigger} from "@angular/material/menu";
import {Weapon} from "../../model/weapon/weapon.model";
import {EditWeaponDialog} from "../../dialog-window/edit-weapon-dialog/edit-weapon-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../dialog-window/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-weapon-group-details',
  templateUrl: './weapon-group-details.component.html',
  styleUrls: ['./weapon-group-details.component.css']
})
export class WeaponGroupDetailsComponent implements OnInit {
  name!: string
  weaponGroup!: WeaponGroup
  weaponGroups!: WeaponGroup[]
  text = TextResourceService
  weaponColumns: string[] = ['name', 'price', 'enc', 'availability', 'category', 'reach', 'damage', 'advantagesAndDisadvantages'];

  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private weaponService: WeaponService,
              private bottomSheet: MatBottomSheet,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.name = params['name'];
        this.groupWeaponCategories(this.weaponService.getWeaponGroups())
      }
    )
  }

  openBottomSheet(model: Model) {
    this.bottomSheet.open(BottomSheetDescription, {
      data: {nameTranslation: model.nameTranslation, description: model.description},
      panelClass: 'bottom-sheet'
    })
  }

  groupWeaponCategories(weaponGroups: WeaponGroup[]) {
    weaponGroups.sort((a, b) => a.name.localeCompare(b.name));
    this.weaponGroups = weaponGroups.filter(g => g.type === this.name)
  }

  onContextMenu(event: MouseEvent, weapon: Weapon) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {'weapon': weapon}
    // @ts-ignore
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
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
}
