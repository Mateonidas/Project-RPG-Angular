import {Component} from '@angular/core';
import {WeaponGroup} from "../../model/weapon/weapons-group.model";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {WeaponService} from "../../shared/services/weapon-service/weapon.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Model} from "../../model/model";
import {
  BottomSheetDescription
} from "../../shared/bottom-sheet/bottom-sheet-description/bottom-sheet-description.component";

@Component({
  selector: 'app-weapon-group-details',
  templateUrl: './weapon-group-details.component.html',
  styleUrls: ['./weapon-group-details.component.css']
})
export class WeaponGroupDetailsComponent {
  name!: string
  weaponGroup!: WeaponGroup
  weaponGroups!: WeaponGroup[]
  text = TextResourceService
  weaponColumns: string[] = ['name', 'price', 'enc', 'availability', 'category', 'reach', 'damage', 'advantagesAndDisadvantages'];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private weaponService: WeaponService,
              private bottomSheet: MatBottomSheet) {
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
}
