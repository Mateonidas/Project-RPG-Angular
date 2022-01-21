import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArmorRest} from "../../../rest-model/armor-rest.model";
import {Armor} from "../../../model/armor/armor.model";
import {BodyLocalization} from "../../../model/body-localization/body-localization.model";
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
    return this.http.get<ArmorRest[]>('http://localhost:8080/armor')
      .pipe(
        tap(data => {
            for (let armor of data) {
              this.armorsList.push(new Armor(
                armor.name,
                armor.nameTranslation,
                TextResourceService.getArmorCategoryNameTranslation(armor.armorCategory).nameTranslation,
                armor.penalties,
                this.prepareBodyLocalizations(armor),
                armor.armorPoints,
                armor.qualities
              ))
            }
            this.armorsList.sort(
              (a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0)
            )
            this.armorsListChanged.next(this.armorsList.slice());
          }
        ));
  }

  private prepareBodyLocalizations(armor: ArmorRest) {
    let bodyLocalizations: BodyLocalization[] = [];
    for (let bodyLocalization of armor.bodyLocalization) {
      bodyLocalizations.push(
        new BodyLocalization(
          bodyLocalization,
          TextResourceService.getBodyLocalizationNameTranslation(bodyLocalization).nameTranslation,
          [1, 10])
      );
    }
    return bodyLocalizations;
  }
}
