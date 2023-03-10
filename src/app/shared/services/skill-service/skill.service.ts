import {Injectable} from '@angular/core'
import {Subject} from "rxjs"
import {Skill} from "../../../model/skill/skill.model"
import {HttpClient} from "@angular/common/http"
import {TextResourceService} from "../text-resource-service/text-resource.service"

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  skillListChanged = new Subject<Skill[]>()
  skillList: Skill[] = []

  constructor(private http: HttpClient) {
  }

  fetchSkills() {
    return this.http.get<Skill[]>('http://localhost:8080/skill').toPromise()
      .then(data => {
        if (data != null) {
          for (let skill of data) {
            skill.nameTranslation = TextResourceService.getSkillNameTranslation(skill.name).nameTranslation
          }
          this.skillList = data
          this.skillList.sort(
            (a, b) => (a.nameTranslation > b.nameTranslation) ? 1 : ((b.nameTranslation > a.nameTranslation) ? -1 : 0)
          )
        } else {
          this.skillList = []
        }
        this.skillListChanged.next(this.skillList.slice())
      })
  }
}
