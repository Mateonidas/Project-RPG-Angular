import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeaponRest} from "../../../rest-model/weapon-rest.model";
import {tap} from "rxjs/operators";
import {Subject} from "rxjs";
import {Weapon} from "../../../model/weapon/weapon.model";
import {TextResourceService} from "../text-resource-service/text-resource.service";

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
              'RANGE',
              weapon.isUsingStrength,
              weapon.damage,
              weapon.weaponQualities
            ))
          }
        })
      )
  }

  //TODO prepare weapon qualities translations in text.json
  private prepareWeaponQualities(qualities: string[]) {
    let weaponQualities: string[] = [];
  }
}
