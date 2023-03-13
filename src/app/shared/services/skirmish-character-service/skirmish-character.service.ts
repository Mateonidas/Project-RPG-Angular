import {Injectable} from '@angular/core'
import {Subject} from "rxjs"
import {Character} from "../../../model/character/character.model"
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model"
import {HttpClient} from "@angular/common/http"
import {TranslateService} from "../translate-service/translate.service"

@Injectable({
  providedIn: 'root'
})
export class SkirmishCharacterService {

  skirmishCharactersChanged = new Subject<SkirmishCharacter[]>()
  skirmishCharactersList: SkirmishCharacter[]

  constructor(private http: HttpClient,
              private translateService: TranslateService) {
    if (JSON.parse(<string>localStorage.getItem('skirmishCharacters')) == null) {
      this.skirmishCharactersList = []
      localStorage.setItem('skirmishCharacters', JSON.stringify(this.skirmishCharactersList))
    } else {
      this.skirmishCharactersList = this.getSkirmishCharacters()
    }
  }

  getSkirmishCharacters() {
    this.skirmishCharactersList = SkirmishCharacter.arrayFromJSON(JSON.parse(<string>localStorage.getItem('skirmishCharacters')))
    return this.skirmishCharactersList.slice()
  }

  getSkirmishCharacter(id: number) {
    this.skirmishCharactersList = SkirmishCharacter.arrayFromJSON(<SkirmishCharacter[]>JSON.parse(<string>localStorage.getItem('skirmishCharacters')))
    return <SkirmishCharacter>this.skirmishCharactersList.find(skirmishCharacter => skirmishCharacter.id == id)
  }

  fetchSkirmishCharacter() {
    return this.http.get<SkirmishCharacter[]>('http://localhost:8080/skirmishCharacter').toPromise()
      .then(data => {
        this.skirmishCharactersList = []
        if (data != null) {
          for (let character of data) {
            this.translateService.prepareCharacter(character)
            let skirmishCharacter = new SkirmishCharacter()
            Object.assign(skirmishCharacter, character)
            this.skirmishCharactersList.push(skirmishCharacter)
          }
        }
        localStorage.setItem('skirmishCharacters', JSON.stringify(this.skirmishCharactersList))
        this.skirmishCharactersChanged.next(this.skirmishCharactersList.slice())
      })
  }

  async storeSkirmishCharacter(character: Character) {
    let skirmishCharacter = new SkirmishCharacter(character, this.skirmishCharactersList.length)
    let numberOfSameCharacters = this.skirmishCharactersList.filter(character => character.name.includes(skirmishCharacter.name)).length
    if (numberOfSameCharacters > 0) {
      skirmishCharacter.name = skirmishCharacter.name + ' ' + (numberOfSameCharacters + 1)
    }
    await this.putSkirmishCharacter(skirmishCharacter).then(
      async () => {
        await this.fetchSkirmishCharacter().then()
      }
    )
  }

  private putSkirmishCharacter(skirmishCharacter: SkirmishCharacter) {
    return this.http
      .put('http://localhost:8080/skirmishCharacter', skirmishCharacter)
      .toPromise()
  }

  async storeSkirmishCharacters(character: Character, number: number) {
    let numberOfSameCharacters = this.skirmishCharactersList.filter(character => character.name.includes(character.name)).length
    number = number + numberOfSameCharacters
    let newSkirmishCharacters = []

    for (let i = numberOfSameCharacters; number > i; number--) {
      let skirmishCharacter = new SkirmishCharacter(character, 0)
      if (number > 1) {
        skirmishCharacter.name = skirmishCharacter.name + ' ' + number
      }
      newSkirmishCharacters.push(skirmishCharacter)
    }

    await this.putSkirmishCharacters(newSkirmishCharacters).then(
      async () => {
        await this.fetchSkirmishCharacter().then()
      }
    )
  }

  async storeSkirmishCharactersGroup(characters: Character[]) {
    let index = this.skirmishCharactersList.length
    let skirmishCharacters: SkirmishCharacter[] = []
    characters.forEach(character => {
      let skirmishCharacter: SkirmishCharacter = new SkirmishCharacter(character, index)
      let numberOfSameCharacters = this.skirmishCharactersList.filter(character => character.name.includes(skirmishCharacter.name)).length
      if (numberOfSameCharacters > 0) {
        skirmishCharacter.name = skirmishCharacter.name + ' ' + (numberOfSameCharacters + 1)
      }
      skirmishCharacters.push(skirmishCharacter)
      ++index
    })

    await this.updateSkirmishCharacters(skirmishCharacters);
  }

  public async updateSkirmishCharacters(skirmishCharacters: SkirmishCharacter[]) {
    await this.putSkirmishCharacters(skirmishCharacters).then(
      async () => {
        await this.fetchSkirmishCharacter().then()
      }
    )
  }

  private putSkirmishCharacters(skirmishCharacters: SkirmishCharacter[]) {
    return this.http
      .put('http://localhost:8080/skirmishCharacters', skirmishCharacters)
      .toPromise()
  }

  async updateSkirmishCharacter(skirmishCharacter: SkirmishCharacter) {
    this.skirmishCharactersList[this.getCharacterIndexById(skirmishCharacter.id)] = skirmishCharacter
    this.skirmishCharactersChanged.next(this.skirmishCharactersList.slice())
    await this.putSkirmishCharacter(skirmishCharacter).then(
      async () => {
        await this.fetchSkirmishCharacter().then()
      }
    )
  }

  private getCharacterIndexById(id: number) {
    let characterInArray = this.skirmishCharactersList.find(skirmishCharacter => skirmishCharacter.id == id)
    return this.skirmishCharactersList.indexOf(<SkirmishCharacter>characterInArray)
  }

  async removeSkirmishCharacter(id: number) {
    await this.deleteSkirmishCharacter(id).then(
      async () => {
        await this.fetchSkirmishCharacter().then()
      }
    )
  }

  private deleteSkirmishCharacter(id: number) {
    return this.http
      .delete(`http://localhost:8080/skirmishCharacter/${id}`)
      .toPromise()
  }

  async removeAllSkirmishCharacters() {
    await this.deleteAllSkirmishCharacters().then(
      async () => {
        await this.fetchSkirmishCharacter().then()
      }
    )
  }

  private deleteAllSkirmishCharacters() {
    return this.http
      .delete('http://localhost:8080/skirmishCharacter')
      .toPromise()
  }
}
