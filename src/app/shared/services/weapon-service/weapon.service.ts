import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeaponRest} from "../../../rest-model/weapon-rest.model";
import {tap} from "rxjs/operators";
import {Subject} from "rxjs";
import {Weapon} from "../../../model/weapon/weapon.model";
import {TextResourceService} from "../text-resource-service/text-resource.service";
import {WeaponQuality} from "../../../model/weapon/weaponTraits/weapon-quality.model";
import {WeaponQualityRest} from "../../../rest-model/weapon-quality-rest.model";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  weaponListChanged = new Subject<Weapon[]>();
  weaponsList: Weapon[] = [];

  constructor(private http: HttpClient) { }

  fetchWeapons() {
    return this.http.get<WeaponRest[]>('http://localhost:8080/weapon')
      .pipe(
        tap(data => {
          for (let weapon of data) {
            this.weaponsList.push(new Weapon(
              weapon.name,
              weapon.nameTranslation,
              TextResourceService.getWeaponTypeNameTranslation(weapon.weaponType).nameTranslation,
              TextResourceService.getWeaponGroupTypeNameTranslation(weapon.weaponGroupType).nameTranslation,
              TextResourceService.getWeaponReachNameTranslation(weapon.weaponReach).nameTranslation,
              weapon.weaponRange,
              weapon.isUsingStrength,
              weapon.damage,
              this.prepareWeaponQualities(<WeaponQualityRest[]>weapon.weaponQualities)
            ))
          }
          this.weaponListChanged.next(this.weaponsList.slice());
        })
      )
  }

  private prepareWeaponQualities(qualities: WeaponQualityRest[]) {
    let weaponQualities: WeaponQuality[] = [];
    for(let quality of qualities) {
      weaponQualities.push(
        new WeaponQuality(
          quality.weaponQualityType,
          TextResourceService.getWeaponQualityNameTranslation(quality.weaponQualityType).nameTranslation,
          quality.value
        )
      )
    }

    return weaponQualities;
  }
}
