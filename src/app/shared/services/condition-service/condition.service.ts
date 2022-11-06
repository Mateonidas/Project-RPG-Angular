import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Model} from "../../../model/model";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "../translate-service/translate.service";

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  conditionsChanged = new Subject<Model[]>()
  conditionsList: Model[] = [];

  constructor(private http: HttpClient,
              private translateService: TranslateService) {
  }

  fetchConditions() {
    return this.http.get<Model[]>('http://localhost:8080/condition').toPromise()
      .then(data => {
        data.forEach(value => {
          this.translateService.prepareCondition(value);
        })
        this.conditionsList = data;
        this.conditionsChanged.next(this.conditionsList.slice());
      })
  }
}
