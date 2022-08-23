import {Component, HostListener, OnInit} from '@angular/core';
import {Character} from "../../model/character/character.model";
import {CharacterService} from "../../shared/services/character-service/character.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character!: Character;
  protected id!: number;
  text = TextResourceService;

  constructor(public characterService: CharacterService,
              public skirmishService: SkirmishCharacterService,
              protected route: ActivatedRoute,
              protected router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.character = <Character>this.characterService.getCharacter(this.id);
      }
    )
  }

  onAddToFight() {
    this.skirmishService.addNewSkirmishCharacter(this.character);
  }

  onEditCharacter() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteCharacter() {
    this.characterService.removeCharacter(this.id);
    this.router.navigate(['characters']);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key == 'Enter') {
      this.onEditCharacter();
    }
  }
}
