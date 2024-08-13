import {Component, OnInit} from '@angular/core';
import {WeaponService} from "../../../core/services/weapon-service/weapon.service";
import {ArmorService} from "../../../core/services/armor-service/armor.service";
import {Model} from "../../../core/model/model";
import {TextResourceService} from "../../../core/services/text-resource-service/text-resource.service";

@Component({
  selector: 'app-quality-list',
  templateUrl: './quality-list.component.html',
  styleUrls: ['./quality-list.component.css']
})
export class QualityListComponent implements OnInit{
  weaponQualities!: Model[];
  armorQualities!: Model[];
  text = TextResourceService;

  constructor(private weaponService: WeaponService,
              private armorService: ArmorService) {
  }

  ngOnInit() {
    this.weaponQualities = this.weaponService.weaponQualitiesList;
    this.armorQualities = this.armorService.armorQualitiesList;
  }
}
