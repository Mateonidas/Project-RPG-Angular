import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Talent} from "../../../model/talent/talent.model";
import {HttpClient} from "@angular/common/http";
import {TalentRest} from "../../../rest-model/talent-rest.model";
import {tap} from "rxjs/operators";
import {TextResourceService} from "../text-resource-service/text-resource.service";

@Injectable({
  providedIn: 'root'
})
export class TalentService {
  talentListChanged = new Subject<Talent[]>();
  talentList: Talent[] = [];

  constructor(private http: HttpClient) { }

  fetchTalent() {
    return this.http.get<TalentRest[]>('http://localhost:8080/talent')
      .pipe(
        tap(data => {
          for (let talent of data) {
            this.talentList.push(new Talent(
              talent.name,
              TextResourceService.getTalentNameTranslation(talent.name).nameTranslation,
              talent.maxLevel
            ))
          }
          this.talentList.sort(
            (a,b) => (a.nameTranslation > b.nameTranslation) ? 1 : ((b.nameTranslation > a.nameTranslation) ? -1 : 0)
          );
          this.talentListChanged.next(this.talentList.slice());
        })
      )
  }
}
