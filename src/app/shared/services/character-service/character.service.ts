import {Injectable} from '@angular/core'
import {Character} from "../../../model/character/character.model"
import {Subject} from "rxjs"
import {HttpClient} from "@angular/common/http"
import {TranslateService} from "../translate-service/translate.service"

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  charactersChanged = new Subject<Character[]>()
  charactersList: Character[] = []

  constructor(private http: HttpClient,
              public translateService: TranslateService) {
    if (JSON.parse(<string>localStorage.getItem('characters')) == null) {
      this.charactersList = []
      localStorage.setItem('characters', JSON.stringify(this.charactersList))
    } else {
      this.charactersList = this.getCharacters()
    }
  }

  fetchCharacters() {
    return this.http.get<Character[]>('http://localhost:8080/character').toPromise()
      .then(data => {
        this.charactersList = []
        if (data != null) {
          for (let element of data) {
            let character = Character.fromJSON(element)
            this.translateService.prepareCharacter(character)
            this.charactersList.push(character)
          }
        }
        localStorage.setItem('characters', JSON.stringify(this.charactersList))
        this.charactersChanged.next(this.charactersList.slice())
      })
  }

  async storeCharacter(character: Character) {
    await this.putCharacter(character).then(
      async () => {
        await this.fetchCharacters().then()
      }
    )
  }

  private putCharacter(character: Character) {
    return this.http
      .put('http://localhost:8080/character', character)
      .toPromise()
  }

  async removeCharacter(id: number) {
    await this.deleteCharacter(id).then(
      async () => {
        await this.fetchCharacters().then()
      }
    )
  }

  private deleteCharacter(id: number) {
    return this.http
      .delete(`http://localhost:8080/character/${id}`)
      .toPromise()
  }

  getCharacters() {
    this.charactersList = Character.arrayFromJSON(JSON.parse(<string>localStorage.getItem('characters')))
    return this.charactersList.slice()
  }

  getCharacter(id: number) {
    this.charactersList = Character.arrayFromJSON(JSON.parse(<string>localStorage.getItem('characters')))
    return this.charactersList.find(value => value.id == id)
  }

  getCharacterGroupsTypes() {
    return this.createCharacterGroupsTypes()
  }

  private createCharacterGroupsTypes() {
    const groupsTypes: {name: string, groups: { name: string, characters: Character[] }[]}[] = []

    this.charactersList.forEach(character => {
      let isTypeExist = false
      for (let groupType of groupsTypes) {
        let isGroupExist = false
        if(groupType.name === character.groupType) {
          for (let group of groupType.groups) {
            if(group.name === character.group) {
              group.characters.push(character)
              isGroupExist = true
              break
            }
          }

          if(!isGroupExist) {
            groupType.groups.push({name: character.group, characters: [character]})
          }
          isTypeExist = true
          break
        }
      }

      if(!isTypeExist) {
        groupsTypes.push({name: character.groupType, groups: [{name: character.group, characters: [character]}]})
      }
    })

    groupsTypes.forEach(groupType => {
      groupType.groups.sort(
        (a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
      )
    })

    return groupsTypes
  }
}
