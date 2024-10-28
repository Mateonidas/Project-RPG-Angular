import {Injectable} from '@angular/core'
import {Subject} from "rxjs"
import {BodyLocalization} from "../../model/body-localization/body-localization.model"
import {HttpClient} from "@angular/common/http"
import {TextResourceService} from "../text-resource-service/text-resource.service"

@Injectable({
  providedIn: 'root'
})
export class BodyLocalizationService {
  bodyLocalizationsChanged = new Subject<BodyLocalization[]>()
  bodyLocalizationsList: BodyLocalization[] = []

  constructor(private http: HttpClient) {
  }

  fetchBodyLocalizations() {
    return this.http.get<BodyLocalization[]>('http://localhost:8080/bodyLocalization').toPromise()
      .then(data => {
        if (data != null) {
          this.prepareBodyLocalizationTranslation(data)
          this.bodyLocalizationsList = data
        } else {
          this.bodyLocalizationsList = []
        }
        this.bodyLocalizationsChanged.next(this.bodyLocalizationsList.slice())
      })
  }

  private prepareBodyLocalizationTranslation(bodyLocalizations: BodyLocalization[]) {
    for (let bodyLocalization of bodyLocalizations) {
      bodyLocalization.nameTranslation = TextResourceService.getTranslation("bodyLocalizations", bodyLocalization.name).nameTranslation
    }
  }
}
