import {Component, OnInit} from '@angular/core';
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {CharacterDetailComponent} from "../../character/character-detail/character-detail.component";
import {CharacterService} from "../../shared/services/character-service/character.service";

@Component({
  selector: 'app-skirmish-character-details',
  templateUrl: './skirmish-character-details.component.html',
  styleUrls: ['./skirmish-character-details.component.css']
})
export class SkirmishCharacterDetailsComponent extends CharacterDetailComponent implements OnInit {

  skirmishCharacter!: SkirmishCharacter;

  constructor(public characterService: CharacterService,
              public skirmishService: SkirmishCharacterService,
              protected route: ActivatedRoute,
              protected router: Router) {
    super(characterService, skirmishService, route, router);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.skirmishCharacter = this.skirmishService.getSkirmishCharacter(this.id);
      }
    )
  }

  onDeleteCharacter() {
    this.skirmishService.removeSkirmishCharacter(this.id);
    this.router.navigate(['skirmish']);
  }
}
