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

  getSortByInitiative() {
    return this.http.get<SkirmishCharacter[]>('http://localhost:8080/initiativeSort').toPromise()
      .then(data => {
        let skirmishCharactersList = [];
        for (let character of data) {
          this.translateService.prepareCharacter(character);
          let skirmishCharacter = new SkirmishCharacter();
          Object.assign(skirmishCharacter, character);
          skirmishCharactersList.push(skirmishCharacter);
        }
        localStorage.setItem('skirmishCharacters', JSON.stringify(skirmishCharactersList));
      });
  }

  async sortByInitiative() {
    await this.getSortByInitiative().then();
  }
}
