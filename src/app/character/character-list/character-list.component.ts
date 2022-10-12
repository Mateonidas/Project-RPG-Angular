import {Component, OnInit} from '@angular/core';
import {Character} from "../../model/character/character.model";
import {CharacterService} from "../../shared/services/character-service/character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  isDataAvailable: boolean = false;
  characters!: Character[];
  subscription!: Subscription;
  test: {group: string, characters: Character[]}[] = [];

  constructor(public characterService: CharacterService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.subscription = this.characterService.charactersChanged.subscribe(
      (characters: Character[]) => {
        this.characters = characters;
      }
    )
    this.characterService.fetchCharacters().then(() => {
      this.isDataAvailable = true;
    });
    this.characters = this.characterService.getCharacters();

    this.characters.forEach(character => {
      let isGroupExist = false;
      for (let element of this.test) {
        if(element.group === character.group) {
          element.characters.push(character);
          isGroupExist = true;
          break;
        }
      }

      if(!isGroupExist) {
        this.test.push({group: character.group, characters: [character]});
      }
    })
  }

  onAddCharacter() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
