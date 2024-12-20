import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {TextResourceService} from "../../../../../core/services/text-resource-service/text-resource.service";
import {WeaponGroup} from "../../../../../core/model/weapon/weapons-group.model";
import {MatTableDataSource} from "@angular/material/table";
import {Model} from "../../../../../core/model/model";
import {
  BottomSheetDescription
} from "../../../../../shared/components/bottom-sheet/bottom-sheet-description/bottom-sheet-description.component";
import {ActivatedRoute} from "@angular/router";
import {WeaponService} from "../../../../../core/services/weapon-service/weapon.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatDialog} from "@angular/material/dialog";
import {MatMenuTrigger} from "@angular/material/menu";
import {Weapon} from "../../../../../core/model/weapon/weapon.model";

@Component({
    selector: 'app-weapon-group-table',
    templateUrl: './weapon-group-table.component.html',
    styleUrls: ['./weapon-group-table.component.css'],
    standalone: false
})
export class WeaponGroupTableComponent implements OnInit, OnChanges{
  @Input() weaponGroup!: WeaponGroup;
  @Input() filterValue?: string;
  text = TextResourceService;
  dataSource = new MatTableDataSource()
  weaponColumns: string[] = ['name', 'price', 'enc', 'availability', 'category', 'reach', 'damage', 'advantagesAndDisadvantages'];
  hasData: boolean = true;

  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  constructor(private bottomSheet: MatBottomSheet,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource.data = this.weaponGroup.weapons;
    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['filterValue']) {
      this.applyFilter();
    }
  }

  applyFilter() {
    if(this.filterValue != undefined) {
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
      this.hasData = this.dataSource.filteredData.length > 0;
    }
  }

  customFilterPredicate(data: any, filter: string): boolean {
    const name = data.nameTranslation ? data.nameTranslation.toLowerCase() : '';
    return name.includes(filter);
  }

  openBottomSheet(model: Model) {
    this.bottomSheet.open(BottomSheetDescription, {
      data: {nameTranslation: model.nameTranslation, description: model.description},
      panelClass: 'bottom-sheet'
    })
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
}
