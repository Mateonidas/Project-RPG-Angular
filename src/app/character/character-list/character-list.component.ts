import {Component, OnInit} from '@angular/core';
import {Character} from "../../model/character/character.model";
import {CharacterService} from "../../shared/services/character-service/character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ArmorService} from "../../shared/services/armor-service/armor.service";
import {WeaponService} from "../../shared/services/weapon-service/weapon.service";
import {SkillService} from "../../shared/services/skill-service/skill.service";
import {TalentService} from "../../shared/services/talent-service/talent.service";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters!: Character[];
  subscription!: Subscription;

  constructor(public armorService: ArmorService,
              public weaponService: WeaponService,
              public skillService: SkillService,
              public talentService: TalentService,
              public characterService: CharacterService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.subscription = this.characterService.charactersChanged.subscribe(
      (characters: Character[]) => {
        this.characters = characters;
      }
    )
    await this.armorService.fetchArmors();
    await this.weaponService.fetchWeapons();
    await this.skillService.fetchSkills();
    await this.talentService.fetchTalent();
    await this.characterService.fetchCharacters();
    this.characters = this.characterService.getCharacters();
  }

  onAddCharacter() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
