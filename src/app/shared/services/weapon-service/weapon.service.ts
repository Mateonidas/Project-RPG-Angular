import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {Subject} from "rxjs"
import {Weapon} from "../../../model/weapon/weapon.model"
import {TextResourceService} from "../text-resource-service/text-resource.service"
import {Model} from "../../../model/model"
import {TranslateService} from "../translate-service/translate.service"
import {WeaponQualityValue} from "../../../model/weapon/weapon-quality-value.model"
import {WeaponGroup} from "../../../model/weapon/weapons-group.model"
import {Character} from "../../../model/character/character.model"

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  weaponTypesListChanged = new Subject<Model[]>()
  weaponTypesList: Model[] = []
  weaponGroupsListChanged = new Subject<Model[]>()
  weaponGroupsList: Model[] = []
  weaponReachesListChanged = new Subject<Model[]>()
  weaponReachesList: Model[] = []
  weaponQualitiesListChanged = new Subject<Model[]>()
  weaponQualitiesList: Model[] = []

  weaponGroupsChanged = new Subject<WeaponGroup[]>()
  weaponGroups: WeaponGroup[] = []
  weaponsList: Weapon[] = []

  constructor(private http: HttpClient,
              private translateService: TranslateService) {
  }

  fetchWeapons() {
    return this.http.get<Weapon[]>('http://localhost:8080/weapon').toPromise()
      .then(data => {
        this.prepareWeaponsList(data)
        this.groupWeapons(data)
        this.weaponGroupsChanged.next(this.weaponGroups.slice())
        this.weaponsList = data
        localStorage.setItem('weapons', JSON.stringify(this.weaponsList))
        localStorage.setItem('weaponGroups', JSON.stringify(this.weaponGroups))
      })
  }

  public prepareWeaponsList(weapons: Weapon[]) {
    for (let weapon of weapons) {
      this.translateService.prepareWeaponTranslation(weapon)
    }
    weapons.sort(
      (a, b) => (a.weaponGroup > b.weaponGroup) ? 1 : ((b.weaponGroup > a.weaponGroup) ? -1 : 0)
    )
  }

  groupWeapons(weapons: Weapon[]) {
    this.weaponGroups = []
    weapons.forEach(weapon => {
      let weaponGroup = this.weaponGroups.find(weaponGroup => weaponGroup.name === weapon.weaponGroup.nameTranslation)
      if (weaponGroup != undefined) {
        weaponGroup.weapons.push(weapon)
        weaponGroup.type = weapon.weaponType.nameTranslation
      } else {
        this.weaponGroups.push(new WeaponGroup(weapon.weaponGroup.nameTranslation, [weapon], weapon.weaponType.nameTranslation))
      }
    })

    this.weaponGroups.forEach(weaponGroup => {
      weaponGroup.weapons.sort(
        (a, b) => (a.nameTranslation > b.nameTranslation) ? 1 : ((b.nameTranslation > a.nameTranslation) ? -1 : 0)
      )
    })
  }

  async storeWeapon(weapon: Weapon) {
    await this.putWeapon(weapon).then(
      async () => {
        await this.fetchWeapons().then()
      }
    )
  }

  putWeapon(weapon: Weapon) {
    return this.http
      .put('http://localhost:8080/weapon', weapon)
      .toPromise()
  }

  getWeapon(id: number) {
    let weapons = Weapon.arrayFromJSON(JSON.parse(<string>localStorage.getItem('weapons')))
    return weapons.find(value => value.id == id)
  }

  getWeaponGroups() {
    this.weaponGroups = WeaponGroup.arrayFromJSON(JSON.parse(<string>localStorage.getItem('weaponGroups')))
    return this.weaponGroups.slice();
  }

  getWeaponGroup(name: string) {
    let weaponGroups = WeaponGroup.arrayFromJSON(JSON.parse(<string>localStorage.getItem('weaponGroups')))
    return weaponGroups.find(value => value.name == name)
  }

  fetchWeaponTypes() {
    return this.http.get<Model[]>('http://localhost:8080/weaponType').toPromise()
      .then(data => {
        this.prepareWeaponTypeListTranslation(data)
        this.weaponTypesList = data
        this.weaponTypesListChanged.next(this.weaponTypesList.slice())
      })
  }

  private prepareWeaponTypeListTranslation(list: Model[]) {
    for (let element of list) {
      element.nameTranslation = TextResourceService.getWeaponTypeNameTranslation(element.name).nameTranslation
    }
  }

  fetchWeaponGroups() {
    return this.http.get<Model[]>('http://localhost:8080/weaponGroup').toPromise()
      .then(data => {
        this.prepareWeaponGroupsListTranslation(data)
        this.weaponGroupsList = data
        this.weaponGroupsListChanged.next(this.weaponGroupsList.slice())
      })
  }

  private prepareWeaponGroupsListTranslation(list: Model[]) {
    for (let element of list) {
      element.nameTranslation = TextResourceService.getWeaponGroupNameTranslation(element.name).nameTranslation
    }
  }

  fetchWeaponReaches() {
    return this.http.get<Model[]>('http://localhost:8080/weaponReach').toPromise()
      .then(data => {
        this.prepareWeaponReachesListTranslation(data)
        this.weaponReachesList = data
        this.weaponReachesListChanged.next(this.weaponReachesList.slice())
      })
  }

  private prepareWeaponReachesListTranslation(list: Model[]) {
    for (let element of list) {
      element.nameTranslation = TextResourceService.getWeaponReachNameTranslation(element.name).nameTranslation
    }
  }

  fetchWeaponQualities() {
    return this.http.get<Model[]>('http://localhost:8080/weaponQuality').toPromise()
      .then(data => {
        this.prepareWeaponQualitiesListTranslation(data)
        this.weaponQualitiesList = data
        this.weaponQualitiesListChanged.next(this.weaponQualitiesList.slice())
      })
  }

  private prepareWeaponQualitiesListTranslation(list: Model[]) {
    for (let quality of list) {
      this.translateService.prepareWeaponQuality(quality)
    }
  }
}
