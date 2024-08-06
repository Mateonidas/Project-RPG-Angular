import {Component, OnInit} from '@angular/core';
import {WeaponService} from "../shared/services/weapon-service/weapon.service";
import {ArmorService} from "../shared/services/armor-service/armor.service";
import {Model} from "../model/model";
import {TextResourceService} from "../shared/services/text-resource-service/text-resource.service";

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
