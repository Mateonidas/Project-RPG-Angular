import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Skill} from "../../../model/skill/skill.model";
import {HttpClient} from "@angular/common/http";
import {SkillRest} from "../../../rest-model/skill-rest.model";
import {tap} from "rxjs/operators";
import {TextResourceService} from "../text-resource-service/text-resource.service";

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  skillListChanged = new Subject<Skill[]>();
  skillList: Skill[] = [];

  constructor(private http: HttpClient) { }

  fetchSkills() {
    return this.http.get<SkillRest[]>('http://localhost:8080/skill')
      .pipe(
        tap(data => {
          for (let skill of data) {
            this.skillList.push(new Skill(
              skill.name,
              TextResourceService.getSkillNameTranslation(skill.name).nameTranslation
            ))
          }
          this.skillList.sort(
            (a,b) => (a.nameTranslation > b.nameTranslation) ? 1 : ((b.nameTranslation > a.nameTranslation) ? -1 : 0)
          );
          this.skillListChanged.next(this.skillList.slice());
        })
      )
  }
}
