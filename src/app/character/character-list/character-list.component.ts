import {Component, OnInit} from '@angular/core';
import {Character} from "../../model/character/character.model";
import {CharacterService} from "../../shared/services/character-service/character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characters!: Character[];
  subscription!: Subscription;
  characterGroups: {group: string, characters: Character[]}[] = [];

  text = TextResourceService;

  constructor(public characterService: CharacterService,
              public skirmishCharacterService: SkirmishCharacterService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.subscription = this.characterService.charactersChanged.subscribe(
      (characters: Character[]) => {
        this.characters = characters;
      }
    )
    this.characters = this.characterService.getCharacters();
    this.characterGroups = this.characterService.getCharacterGroups();
  }

  onAddCharacter() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onAddGroupToFight(characters: Character[]) {
    this.skirmishCharacterService.storeSkirmishCharacters(characters);
  }
}
