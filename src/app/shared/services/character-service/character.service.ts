import {Injectable} from '@angular/core';
import {Character} from "../../../model/character/character.model";
import {Subject} from "rxjs";
import {CharacterTalent} from "../../../model/talent/character-talent.model";
import {CharacterSkill} from "../../../model/skill/character-skill.model";
import {HttpClient} from "@angular/common/http";
import {TextResourceService} from "../text-resource-service/text-resource.service";
import {WeaponService} from "../weapon-service/weapon.service";
import {ArmorService} from "../armor-service/armor.service";
import {CharacterWeapon} from "../../../model/weapon/character-weapon.model";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  charactersChanged = new Subject<Character[]>();
  charactersList: Character[] = [];

  constructor(private http: HttpClient,
              public weaponService: WeaponService,
              public armorService: ArmorService) {
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
          this.prepareSkills(character.skills);
          this.prepareTalents(character.talents);
          this.prepareWeapons(character.weapons);
          this.armorService.prepareArmorsList(character.armors);
          this.charactersList.push(character);
        }
        localStorage.setItem('characters', JSON.stringify(this.charactersList));
        this.charactersChanged.next(this.charactersList.slice());
      })
  }

  putCharacter(character: Character) {
    return this.http
      .put('http://localhost:8080/character', character)
      .toPromise()
  }

  private prepareSkills(skills: CharacterSkill[]) {
    for (let skill of skills) {
      skill.skill.nameTranslation = TextResourceService.getSkillNameTranslation(skill.skill.name).nameTranslation
    }
  }

  private prepareTalents(talents: CharacterTalent[]) {
    for (let talent of talents) {
      talent.talent.nameTranslation = TextResourceService.getTalentNameTranslation(talent.talent.name).nameTranslation;
    }

    return talents;
  }

  private prepareWeapons(weapons: CharacterWeapon[]) {
    for (let weapon of weapons) {
      this.weaponService.prepareWeaponTranslation(weapon.weapon);
    }
  }


  getCharacters() {
    this.charactersList = Character.arrayFromJSON(JSON.parse(<string>localStorage.getItem('characters')));
    return this.charactersList.slice();
  }

  getCharacter(id: number) {
    this.charactersList = Character.arrayFromJSON(JSON.parse(<string>localStorage.getItem('characters')));
    return this.charactersList.find(value => value.id == id);
  }

  async storeCharacter(character: Character) {
    await this.putCharacter(character).then(
      async () => {
        await this.fetchCharacters().then()
      }
    );
  }
}
