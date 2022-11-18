import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Talent} from "../../../model/talent/talent.model";
import {HttpClient} from "@angular/common/http";
import {TextResourceService} from "../text-resource-service/text-resource.service";
import {TranslateService} from "../translate-service/translate.service";

@Injectable({
  providedIn: 'root'
})
export class TalentService {
  talentListChanged = new Subject<Talent[]>();
  talentList: Talent[] = [];

  constructor(private http: HttpClient,
              private translationService: TranslateService) {
  }

  fetchTalents() {
    return this.http.get<Talent[]>('http://localhost:8080/talent').toPromise()
      .then(data => {
        for (let talent of data) {
          this.translationService.prepareTalent(talent);
        }
        this.talentList = data;
        this.talentList.sort(
          (a, b) => (a.nameTranslation > b.nameTranslation) ? 1 : ((b.nameTranslation > a.nameTranslation) ? -1 : 0)
        );
        this.talentListChanged.next(this.talentList.slice());
      });
  }
}
