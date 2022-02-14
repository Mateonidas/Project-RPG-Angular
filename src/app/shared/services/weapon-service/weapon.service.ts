import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  constructor(private http: HttpClient) {
  }

  fetchWeapons() {
    return this.http.get<Weapon[]>('http://localhost:8080/weapon').toPromise()
      .then(data => {
          this.prepareWeaponsList(data);
          this.weaponsList = data;
          this.weaponListChanged.next(this.weaponsList.slice());
        });
  }

  public prepareWeaponsList(weapons: Weapon[]) {
    for (let weapon of weapons) {
      this.prepareWeaponTranslation(weapon);
    }
    weapons.sort(
      (a, b) => (a.weaponGroupType > b.weaponGroupType) ? 1 : ((b.weaponGroupType > a.weaponGroupType) ? -1 : 0)
    )
  }

  private prepareWeaponTranslation(weapon: Weapon) {
    weapon.weaponType.nameTranslation = TextResourceService.getWeaponTypeNameTranslation(weapon.weaponType.name).nameTranslation;
    weapon.weaponGroupType.nameTranslation = TextResourceService.getWeaponGroupTypeNameTranslation(weapon.weaponGroupType.name).nameTranslation;
    weapon.weaponReach.nameTranslation = TextResourceService.getWeaponReachNameTranslation(weapon.weaponReach.name).nameTranslation;

    for (let quality of weapon.weaponQualities) {
      quality.nameTranslation = TextResourceService.getWeaponQualityNameTranslation(quality.name).nameTranslation;
    }
  }
}
