import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Weapon} from "../../../model/weapon/weapon.model";
import {TextResourceService} from "../text-resource-service/text-resource.service";
import {Model} from "../../../model/model";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  weaponListChanged = new Subject<Weapon[]>();
  weaponsList: Weapon[] = [];
  weaponTypesListChanged = new Subject<Model[]>();
  weaponTypesList: Model[] = [];
  weaponGroupsListChanged = new Subject<Model[]>();
  weaponGroupsList: Model[] = [];
  weaponReachesListChanged = new Subject<Model[]>();
  weaponReachesList: Model[] = [];
  weaponQualitiesListChanged = new Subject<Model[]>();
  weaponQualitiesList: Model[] = [];

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

  public prepareWeaponTranslation(weapon: Weapon) {
    weapon.weaponType.nameTranslation = TextResourceService.getWeaponTypeNameTranslation(weapon.weaponType.name).nameTranslation;
    weapon.weaponGroupType.nameTranslation = TextResourceService.getWeaponGroupTypeNameTranslation(weapon.weaponGroupType.name).nameTranslation;
    weapon.weaponReach.nameTranslation = TextResourceService.getWeaponReachNameTranslation(weapon.weaponReach.name).nameTranslation;

    for (let quality of weapon.weaponQualities) {
      quality.nameTranslation = TextResourceService.getWeaponQualityNameTranslation(quality.name).nameTranslation;
    }
  }

  async storeWeapon(weapon: Weapon) {
    await this.putWeapon(weapon).then(
      async () => {
        await this.fetchWeapons().then();
      }
    )
  }

  putWeapon(weapon: Weapon) {
    return this.http
      .put('http://localhost:8080/weapon', weapon)
      .toPromise();
  }

  fetchWeaponTypes() {
    return this.http.get<Model[]>('http://localhost:8080/weaponType').toPromise()
      .then(data => {
        this.prepareWeaponTypeListTranslation(data)
        this.weaponTypesList = data;
        this.weaponTypesListChanged.next(this.weaponTypesList.slice());
      })
  }

  private prepareWeaponTypeListTranslation(list: Model[]) {
    for (let element of list) {
      element.nameTranslation = TextResourceService.getWeaponTypeNameTranslation(element.name).nameTranslation;
    }
  }

  fetchWeaponGroups() {
    return this.http.get<Model[]>('http://localhost:8080/weaponGroup').toPromise()
      .then(data => {
        this.prepareWeaponGroupsListTranslation(data)
        this.weaponGroupsList = data;
        this.weaponGroupsListChanged.next(this.weaponGroupsList.slice());
      })
  }

  private prepareWeaponGroupsListTranslation(list: Model[]) {
    for (let element of list) {
      element.nameTranslation = TextResourceService.getWeaponGroupTypeNameTranslation(element.name).nameTranslation;
    }
  }

  fetchWeaponReaches() {
    return this.http.get<Model[]>('http://localhost:8080/weaponReach').toPromise()
      .then(data => {
        this.prepareWeaponReachesListTranslation(data)
        this.weaponReachesList = data;
        this.weaponReachesListChanged.next(this.weaponReachesList.slice());
      })
  }

  private prepareWeaponReachesListTranslation(list: Model[]) {
    for (let element of list) {
      element.nameTranslation = TextResourceService.getWeaponReachNameTranslation(element.name).nameTranslation;
    }
  }

  fetchWeaponQualities() {
    return this.http.get<Model[]>('http://localhost:8080/weaponQuality').toPromise()
      .then(data => {
        this.prepareWeaponQualitiesListTranslation(data)
        this.weaponQualitiesList = data;
        this.weaponQualitiesListChanged.next(this.weaponQualitiesList.slice());
      })
  }

  private prepareWeaponQualitiesListTranslation(list: Model[]) {
    for (let element of list) {
      element.nameTranslation = TextResourceService.getWeaponQualityNameTranslation(element.name).nameTranslation;
    }
  }
}
