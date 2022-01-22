import {Injectable} from '@angular/core';
import {Character} from "../../../model/character/character.model";
import {Subject} from "rxjs";
import {Skill, SkillsList} from "../../../model/skill/skill.model";
import {CharacterTalent} from "../../../model/talent/character-talent.model";
import {WeaponsList} from "../../../model/weapon/weapon.model";
import {ArmorsList} from "../../../model/armor/armor.model";
import {CharacterCharacteristics} from "../../../model/characteristic/character-characteristic.model";
import {CharacterSkill} from "../../../model/skill/character-skill.model";
import {HttpClient} from "@angular/common/http";
import {CharacterRest} from "../../../rest-model/character-rest.model";
import {tap} from "rxjs/operators";
import {CharacterCharacteristicRest} from "../../../rest-model/character-characteristic-rest.model";
import {TextResourceService} from "../text-resource-service/text-resource.service";
import {CharacterSkillRest} from "../../../rest-model/character-skill-rest.model";
import {CharacterTalentRest} from "../../../rest-model/character-talent-rest.model";
import {WeaponService} from "../weapon-service/weapon.service";
import {ArmorService} from "../armor-service/armor.service";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  charactersChanged = new Subject<Character[]>();
  charactersList: Character[] = [];

  constructor(private http: HttpClient,
              public weaponService: WeaponService,
              public armorService: ArmorService) {
    // if (JSON.parse(<string>localStorage.getItem('characters')) == null) {
    //   // this.prepareTestCharacter();
    //   localStorage.setItem('characters', JSON.stringify(this.charactersList));
    // } else {
    //   this.charactersList = this.getCharacters();
    // }
  }

  fetchCharacters() {
    return this.http.get<CharacterRest[]>('http://localhost:8080/character')
      .pipe(
        tap(data => {
          for (let character of data) {
            this.charactersList.push(new Character(
              character.name,
              character.description,
              this.prepareCharacteristics(character.characteristics),
              this.prepareSkills(character.skills),
              this.prepareTalents(character.talents),
              character.isRightHanded,
              this.weaponService.prepareWeaponsList(character.weapons),
              this.armorService.prepareArmorsList(character.armors)
            ))
          }
          this.charactersChanged.next(this.charactersList.slice());
        })
      )
  }

  private prepareCharacteristics(characteristicsRest: CharacterCharacteristicRest[]) {
    let characterCharacteristics = new CharacterCharacteristics();
    characterCharacteristics.prepareCharacteristicsTable(characteristicsRest);
    return characterCharacteristics;
  }

  private prepareSkills(skillsRest: CharacterSkillRest[]) {
    let skills: CharacterSkill[] = [];
    for (let skillRest of skillsRest) {
      skills.push(
        new CharacterSkill(
          new Skill(
            skillRest.skill,
            TextResourceService.getSkillNameTranslation(skillRest.skill).nameTranslation
          ),
          skillRest.value
        )
      )
    }

    return skills;
  }

  private prepareTalents(talentsRest: CharacterTalentRest[]) {
    let talents: CharacterTalent[] = [];
    for (let talentRest of talentsRest) {
      talents.push(
        new CharacterTalent(
          talentRest.talent.name,
          TextResourceService.getTalentNameTranslation(talentRest.talent.name).nameTranslation,
          talentRest.talent.maxLevel,
          talentRest.value
        )
      )
    }

    return talents;
  }

  getCharacters() {
    // this.charactersList = Character.arrayFromJSON(JSON.parse(<string>localStorage.getItem('characters')));
    return this.charactersList.slice();
  }

  getCharacter(id: number) {
    // this.charactersList = Character.arrayFromJSON(JSON.parse(<string>localStorage.getItem('characters')));
    return this.charactersList[id];
  }

  addNewCharacter(character: Character) {
    this.charactersList.push(character);
    this.charactersChanged.next(this.charactersList.slice());
    localStorage.setItem('characters', JSON.stringify(this.charactersList));
  }

  updateCharacter(index: number, character: Character) {
    this.charactersList[index] = character;
    this.charactersChanged.next(this.charactersList.slice());
    localStorage.setItem('characters', JSON.stringify(this.charactersList));
  }

  private prepareTestCharacter() {
    this.charactersList = [];
    this.charactersList.push(
      new Character(
        'Markus',
        'Mieszkaniec Ubersreiku.',

        new CharacterCharacteristics(
          4, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 15
        ),
        [
          new CharacterSkill(SkillsList.meleeBasic, 40)
        ],
        [
          new CharacterTalent('Ambidextrous', 'Oburęczność', '2', 1)
        ],
        true,
        [
          WeaponsList.handWeapon
        ],
        [
          ArmorsList.leatherJack,
          ArmorsList.leatherLeggings,
        ]
      )
    )
  }
}
