import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Armor} from "../../../model/armor/armor.model";
import {TextResourceService} from "../text-resource-service/text-resource.service";
import {tap} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArmorService {
  armorsListChanged = new Subject<Armor[]>()
  armorsList: Armor[] = [];

  constructor(private http: HttpClient) {
  }

  fetchArmors() {
    return this.http.get<Armor[]>('http://localhost:8080/armor')
      .pipe(
        tap(data => {
            this.prepareArmorsList(data);
            this.armorsList = data;
            this.armorsListChanged.next(this.armorsList.slice());
          }
        ));
  }

  public prepareArmorsList(armors: Armor[]) {
    for (let armor of armors) {
      this.prepareArmorTranslation(armor);
    }
    armors.sort(
      (a, b) => (a.armorCategory > b.armorCategory) ? 1 : ((b.armorCategory > a.armorCategory) ? -1 : 0)
    )
  }

  private prepareArmorTranslation(armor: Armor) {
    armor.armorCategory.nameTranslation = TextResourceService.getArmorCategoryNameTranslation(armor.armorCategory.name).nameTranslation;

    for (let penalty of armor.penalties) {
      penalty.nameTranslation = TextResourceService.getArmorPenaltyNameTranslation(penalty.name).nameTranslation;
    }

    for (let bodyLocalization of armor.bodyLocalization) {
      bodyLocalization.nameTranslation = TextResourceService.getBodyLocalizationNameTranslation(bodyLocalization.name).nameTranslation;
    }

    for (let quality of armor.qualities) {
      quality.nameTranslation = TextResourceService.getArmorQualitiesNameTranslation(quality.name).nameTranslation;
    }
  }
}
