import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {Armor} from "../../model/armor/armor.model"
import {Subject} from "rxjs"
import {Model} from "../../model/model"
import {TranslateService} from "../translate-service/translate.service"
import {tap} from "rxjs/operators";
import {BaseService} from "../base.service";
import {TextResourceKeys} from "../../model/types";

@Injectable({
  providedIn: 'root'
})
export class ArmorService {
  armorsListChanged = new Subject<Armor[]>()
  armorsList: Armor[] = []
  armorCategoriesListChanged = new Subject<Model[]>()
  armorCategoriesList: Model[] = []
  armorPenaltiesListChanged = new Subject<Model[]>()
  armorPenaltiesList: Model[] = []
  armorQualitiesListChanged = new Subject<Model[]>()
  armorQualitiesList: Model[] = []
  armorTypesList: Model[] = []

  constructor(private http: HttpClient,
              private translateService: TranslateService,
              private baseService: BaseService) {
  }

  fetchArmors() {
    return this.http.get<Armor[]>('http://localhost:8080/armor').pipe(
      tap(data => {
        if (data) {
          this.translateService.prepareArmorsList(data);
          this.armorsList = data;
        } else {
          this.armorsList = [];
        }
        this.armorsListChanged.next(this.armorsList.slice());
      })
    ).toPromise();
  }

  async storeArmor(armor: Armor) {
    await this.putArmor(armor).toPromise();
    await this.fetchArmors();
  }

  putArmor(armor: Armor) {
    return this.http.put('http://localhost:8080/armor', armor)
  }


  async fetchArmorCategories() {
    return this.baseService.fetchMethod('armorCategory', <TextResourceKeys>'armorCategory',
      this.armorCategoriesList, this.armorCategoriesListChanged)
  }

  fetchArmorPenalties() {
    return this.baseService.fetchMethod('armorPenalty', <TextResourceKeys>'armorPenalties',
      this.armorPenaltiesList, this.armorPenaltiesListChanged)
  }

  fetchArmorQualities() {
    return this.baseService.fetchMethod('armorQuality', <TextResourceKeys>'armorQualities',
      this.armorQualitiesList, this.armorQualitiesListChanged)
  }

  fetchArmorTypes() {
    return this.baseService.fetchMethod('armorType', <TextResourceKeys>'armorType', this.armorTypesList)
  }

  async removeArmor(id: number) {
    await this.deleteArmor(id).then(
      async () => {
        await this.fetchArmors().then()
      }
    )
  }

  private deleteArmor(id: number) {
    return this.http
      .delete(`http://localhost:8080/armor/${id}`)
      .toPromise()
  }
}
