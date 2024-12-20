import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Model} from "../../model/model";
import {HttpClient} from "@angular/common/http";
import {TextResourceService} from "../text-resource-service/text-resource.service";

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  availabilityListChanged = new Subject<Model[]>()
  availabilityList: Model[] = []

  constructor(private http: HttpClient) {
  }

  fetchAvailabilities() {
    return this.http.get<Model[]>('http://localhost:8080/availability').toPromise()
      .then(data => {
        if(data != undefined) {
          this.prepareAvailabilityListTranslation(data)
          this.availabilityList = data
          this.availabilityListChanged.next(this.availabilityList.slice())
        }
      })
  }

  private prepareAvailabilityListTranslation(data: Model[]) {
    for (const element of data) {
      element.nameTranslation = TextResourceService.getTranslation("availability", element.name).nameTranslation;
    }
  }
}
