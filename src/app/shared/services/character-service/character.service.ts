import {Injectable} from '@angular/core';
import {Character} from "../../../model/character/character.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ArmorService} from "../armor-service/armor.service";
import {TranslateService} from "../ translate-service/translate.service";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  charactersChanged = new Subject<Character[]>();
  charactersList: Character[] = [];

  constructor(private http: HttpClient,
              public armorService: ArmorService,
              public translateService: TranslateService) {
    if (JSON.parse(<string>localStorage.getItem('characters')) == null) {
      this.charactersList = [];
      localStorage.setItem('characters', JSON.stringify(this.charactersList));
    } else {
      this.charactersList = this.getCharacters();
    }
  }

  fetchCharacters() {
    return this.http.get<Character[]>('http://localhost:8080/character').toPromise()
      .then(data => {
        this.charactersList = [];
        for (let character of data) {
          this.translateService.prepareSkills(character.skills);
          this.translateService.prepareTalents(character.talents);
          this.translateService.prepareWeapons(character.weapons);
          this.armorService.prepareArmorsList(character.armors);
          this.translateService.prepareBodyLocalizations(character.bodyLocalizations);
          this.translateService.prepareConditions(character.conditions);
          this.charactersList.push(character);
        }
        localStorage.setItem('characters', JSON.stringify(this.charactersList));
        this.charactersChanged.next(this.charactersList.slice());
      })
  }

  async storeCharacter(character: Character) {
    await this.putCharacter(character).then(
      async () => {
        await this.fetchCharacters().then();
      }
    );
  }

  private putCharacter(character: Character) {
    return this.http
      .put('http://localhost:8080/character', character)
      .toPromise();
  }

  async removeCharacter(id: number) {
    await this.deleteCharacter(id).then(
      async () => {
        await this.fetchCharacters().then();
      }
    );
  }

  private deleteCharacter(id: number) {
    return this.http
      .delete(`http://localhost:8080/character/${id}`)
      .toPromise();
  }

  getCharacters() {
    this.charactersList = Character.arrayFromJSON(JSON.parse(<string>localStorage.getItem('characters')));
    return this.charactersList.slice();
  }

  getCharacter(id: number) {
    this.charactersList = Character.arrayFromJSON(JSON.parse(<string>localStorage.getItem('characters')));
    return this.charactersList.find(value => value.id == id);
  }
}
