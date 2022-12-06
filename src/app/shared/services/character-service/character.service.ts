import {Injectable} from '@angular/core';
import {Character} from "../../../model/character/character.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "../translate-service/translate.service";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  charactersChanged = new Subject<Character[]>();
  charactersList: Character[] = [];

  constructor(private http: HttpClient,
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
        for (let element of data) {
          let character = Character.fromJSON(element);
          this.translateService.prepareCharacter(character);
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

  getCharacterGroups() {
    return this.createCharacterGroups();
  }

  private createCharacterGroups() {
    const characterGroups: { group: string, characters: Character[] }[] = [];

    this.charactersList.forEach(character => {
      let isGroupExist = false;
      for (let element of characterGroups) {
        if (element.group === character.group) {
          element.characters.push(character);
          isGroupExist = true;
          break;
        }
      }

      if (!isGroupExist) {
        characterGroups.push({group: character.group, characters: [character]});
      }
    })

    characterGroups.sort(
      (a, b) => (a.group > b.group) ? 1 : ((b.group > a.group) ? -1 : 0)
    )

    return characterGroups;
  }
}
