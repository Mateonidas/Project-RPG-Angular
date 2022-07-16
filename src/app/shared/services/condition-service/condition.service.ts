import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Model} from "../../../model/model";
import {HttpClient} from "@angular/common/http";
import {TextResourceService} from "../text-resource-service/text-resource.service";

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  conditionsChanged = new Subject<Model[]>()
  conditionsList: Model[] = [];

  constructor(private http: HttpClient) {
  }

  fetchConditions(){
    return this.http.get<Model[]>('http://localhost:8080/condition').toPromise()
      .then(data => {
        this.prepareConditionNameTranslation(data);
        this.conditionsList = data;
        this.conditionsChanged.next(this.conditionsList.slice());
      })
  }

  private prepareConditionNameTranslation(data: Model[]) {
    for (let condition of data) {
      condition.nameTranslation = TextResourceService.getConditionNameTranslation(condition.name).nameTranslation;
    }
  }
}
