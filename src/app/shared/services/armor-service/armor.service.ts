import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Armor} from "../../../model/armor/armor.model";
import {TextResourceService} from "../text-resource-service/text-resource.service";
import {tap} from "rxjs/operators";
import {Subject} from "rxjs";
import {Model} from "../../../model/model";

@Injectable({
  providedIn: 'root'
})
export class ArmorService {
  armorsListChanged = new Subject<Armor[]>();
  armorsList: Armor[] = [];
  armorCategoriesListChanged = new Subject<Model[]>();
  armorCategoriesList: Model[] = [];
  armorPenaltiesListChanged = new Subject<Model[]>();
  armorPenaltiesList: Model[] = [];
  armorQualitiesListChanged = new Subject<Model[]>();
  armorQualitiesList: Model[] = [];

  constructor(private http: HttpClient) {
  }

  fetchArmors() {
    return this.http.get<Armor[]>('http://localhost:8080/armor').toPromise()
      .then(data => {
            this.prepareArmorsList(data);
            this.armorsList = data;
            this.armorsListChanged.next(this.armorsList.slice());
          }
        );
  }

  async storeArmor(armor: Armor) {
    await this.putArmor(armor).then(
      async () => {
        await this.fetchArmors().then();
      }
    )
  }

  putArmor(armor: Armor) {
    return this.http
      .put('http://localhost:8080/armor', armor)
      .toPromise();
  }

  public prepareArmorsList(armors: Armor[]) {
    for (let armor of armors) {
      this.prepareArmorTranslation(armor);
    }
    armors.sort(
      (a, b) => (a.armorCategory.name > b.armorCategory.name) ? 1 : ((b.armorCategory.name > a.armorCategory.name) ? -1 : 0)
    )
  }

  private prepareArmorTranslation(armor: Armor) {
    armor.armorCategory.nameTranslation = TextResourceService.getArmorCategoryNameTranslation(armor.armorCategory.name).nameTranslation;

    for (let armorBodyLocalization of armor.armorBodyLocalizations) {
      armorBodyLocalization.bodyLocalization.nameTranslation = TextResourceService.getBodyLocalizationNameTranslation(armorBodyLocalization.bodyLocalization.name).nameTranslation;
    }

    if(armor.armorPenalties != undefined) {
      for (let penalty of armor.armorPenalties) {
        penalty.nameTranslation = TextResourceService.getArmorPenaltyNameTranslation(penalty.name).nameTranslation;
      }
    }

    if(armor.armorQualities != undefined) {
      for (let quality of armor.armorQualities) {
        quality.nameTranslation = TextResourceService.getArmorQualitiesNameTranslation(quality.name).nameTranslation;
      }
    }
  }

  fetchArmorCategories() {
    return this.http.get<Model[]>('http://localhost:8080/armorCategory').toPromise()
      .then(data => {
          this.prepareArmorCategoriesListTranslation(data);
          this.armorCategoriesList = data;
          this.armorCategoriesListChanged.next(this.armorCategoriesList.slice());
        }
      );
  }

  public prepareArmorCategoriesListTranslation(armorCategories: Model[]) {
    for (let armorCategory of armorCategories) {
      armorCategory.nameTranslation = TextResourceService.getArmorCategoryNameTranslation(armorCategory.name).nameTranslation;
    }
  }

  fetchArmorPenalties() {
    return this.http.get<Model[]>('http://localhost:8080/armorPenalty').toPromise()
      .then(data => {
          this.prepareArmorPenaltiesListTranslation(data);
          this.armorPenaltiesList = data;
          this.armorPenaltiesListChanged.next(this.armorPenaltiesList.slice());
        }
      );
  }

  public prepareArmorPenaltiesListTranslation(armorPenalties: Model[]) {
    for (let armorPenalty of armorPenalties) {
      armorPenalty.nameTranslation = TextResourceService.getArmorPenaltyNameTranslation(armorPenalty.name).nameTranslation;
    }
  }

  fetchArmorQualities() {
    return this.http.get<Model[]>('http://localhost:8080/armorQuality').toPromise()
      .then(data => {
          this.prepareArmorQualitiesListTranslation(data);
          this.armorQualitiesList = data;
          this.armorQualitiesListChanged.next(this.armorQualitiesList.slice());
        }
      );
  }

  public prepareArmorQualitiesListTranslation(armorQualities: Model[]) {
    for (let armorQuality of armorQualities) {
      armorQuality.nameTranslation = TextResourceService.getArmorQualitiesNameTranslation(armorQuality.name).nameTranslation;
    }
  }
}
