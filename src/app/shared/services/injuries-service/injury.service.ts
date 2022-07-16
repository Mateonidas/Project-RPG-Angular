import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Model} from "../../../model/model";
import {HttpClient} from "@angular/common/http";
import {TextResourceService} from "../text-resource-service/text-resource.service";

@Injectable({
  providedIn: 'root'
})
export class InjuryService {

  injuriesChanged = new Subject<Model[]>()
  injuriesList: Model[] = [];

  constructor(private http: HttpClient) {
  }

  fetchInjuries(){
    return this.http.get<Model[]>('http://localhost:8080/injury').toPromise()
      .then(data => {
        this.prepareInjuryNameTranslation(data);
        this.injuriesList = data;
        this.injuriesChanged.next(this.injuriesList.slice());
      })
  }

  private prepareInjuryNameTranslation(data: Model[]) {
    for (let injury of data) {
      injury.nameTranslation = TextResourceService.getInjuryNameTranslation(injury.name).nameTranslation;
    }
  }
}
