import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {TranslateService} from "../ translate-service/translate.service";

@Injectable({
  providedIn: 'root'
})
export class SkirmishService {

  constructor(private http: HttpClient,
              private translateService: TranslateService) { }
}
