import {Component, OnInit} from '@angular/core';
import {Armor} from "../../model/armor/armor.model";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {ArmorService} from "../../shared/services/armor-service/armor.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Model} from "../../model/model";
import {
  BottomSheetDescription
} from "../../shared/bottom-sheet/bottom-sheet-description/bottom-sheet-description.component";

@Component({
  selector: 'app-armor-group-details',
  templateUrl: './armor-group-details.component.html',
  styleUrls: ['./armor-group-details.component.css']
})
export class ArmorGroupDetails implements OnInit {
  armorGroups!: { name: string, armors: Armor[] }[]
  text = TextResourceService
  armorsColumns: string[] = ['name', 'price', 'enc', 'availability', 'category', 'localization', 'armorPoints', 'penalties', 'qualities'];

  constructor(private armorService: ArmorService,
              private bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.armorService.armorsListChanged.subscribe(
      (armors: Armor[]) => {
        this.groupArmors(armors)
      }
    )
    this.groupArmors(this.armorService.armorsList)
  }

  private groupArmors(armors: Armor[]) {
    this.armorGroups = []
    armors.forEach(armor => {
      if (armor.armorCategory.name != 'OTHER') {
        let armorGroup = this.armorGroups.find(a => a.name === armor.armorCategory.nameTranslation)
        if (armorGroup != undefined) {
          armorGroup.armors.push(armor)
        } else {
          this.armorGroups.push({armors: [armor], name: armor.armorCategory.nameTranslation})
        }
      }
    })
  }

  openBottomSheet(model: Model) {
    this.bottomSheet.open(BottomSheetDescription, {
      data: {nameTranslation: model.nameTranslation, description: model.description},
      panelClass: 'bottom-sheet'
    })
  }
}
