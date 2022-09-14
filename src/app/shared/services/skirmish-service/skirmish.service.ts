import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";

@Injectable({
  providedIn: 'root'
})
export class SkirmishService {

  constructor(private http: HttpClient) { }

  getSortByInitiative() {
    return this.http.get<SkirmishCharacter[]>('http://localhost:8080/initiativeSort').toPromise()
      .then(data => {
        localStorage.setItem('skirmishCharacters', JSON.stringify(<SkirmishCharacter[]>data));
      });
  }

  async sortByInitiative() {
    await this.getSortByInitiative().then();
  }
}
