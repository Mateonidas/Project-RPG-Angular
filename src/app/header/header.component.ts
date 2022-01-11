import { Component, OnInit } from '@angular/core';
import {ArmorService} from "../shared/services/armor-service/armor.service";
import {WeaponService} from "../shared/services/weapon-service/weapon.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(public armorService: ArmorService,
              public weaponService: WeaponService) { }

  ngOnInit() {
    this.armorService.fetchArmors().subscribe();
    this.weaponService.fetchWeapons().subscribe();
  }

}
