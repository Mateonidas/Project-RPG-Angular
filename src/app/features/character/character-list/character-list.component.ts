import {Component, OnInit} from '@angular/core';
import {Character} from "../../../core/model/character/character.model";
import {CharacterService} from "../../../core/services/character-service/character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TextResourceService} from "../../../core/services/text-resource-service/text-resource.service";
import {SkirmishCharacterService} from "../../../core/services/skirmish-character-service/skirmish-character.service";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit {

  subscription!: Subscription;
  characterGroupsTypes: {name: string, groups: { name: string, characters: Character[] }[]}[] = [];

  text = TextResourceService;

  constructor(public characterService: CharacterService,
              public skirmishCharacterService: SkirmishCharacterService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.subscription = this.characterService.charactersChanged.subscribe(
      () => {
        this.characterGroupsTypes = this.characterService.getCharacterGroupsTypes();
      }
    )
    this.characterGroupsTypes = this.characterService.getCharacterGroupsTypes();
  }

  onAddCharacter() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onAddGroupToFight(characters: Character[]) {
    this.skirmishCharacterService.storeSkirmishCharactersGroup(characters);
    // @ts-ignore
    event.stopPropagation()
  }

  onAddToGroup(type: string, characterGroup: string) {
    this.router.navigate(['new'], {relativeTo: this.route, queryParams: {groupType: type, group: characterGroup}, queryParamsHandling: 'merge'})
  }
}
