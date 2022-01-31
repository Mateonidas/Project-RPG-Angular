import {Component, OnInit} from '@angular/core';
import {Character} from "../../model/character/character.model";
import {CharacterService} from "../../shared/services/character-service/character.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character!: Character;
  private id!: number;

  constructor(public characterService: CharacterService,
              public skirmishService: SkirmishCharacterService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.character = this.characterService.getCharacter(this.id);
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

  }
}
