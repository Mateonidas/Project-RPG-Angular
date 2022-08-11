import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";

@Injectable({
  providedIn: 'root'
})
export class SkirmishService {

  constructor(private http: HttpClient) { }

  postSortByInitiative(skirmishCharacters: SkirmishCharacter[]) {
    return this.http.post<SkirmishCharacter[]>('http://localhost:8080/initiativeSort', skirmishCharacters).toPromise()
      .then(data => {
        localStorage.setItem('skirmishCharacters', JSON.stringify(<SkirmishCharacter[]>data));
      });
  }

  async sortByInitiative(skirmishCharacters: SkirmishCharacter[]) {
    await this.postSortByInitiative(skirmishCharacters).then();
  }
}
