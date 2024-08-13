import {Component, HostListener, OnInit} from '@angular/core'
import {Character} from "../../../core/model/character/character.model"
import {CharacterService} from "../../../core/services/character-service/character.service"
import {ActivatedRoute, Params, Router} from "@angular/router"
import {TextResourceService} from "../../../core/services/text-resource-service/text-resource.service"
import {SkirmishCharacter} from "../../../core/model/skirmish/skirmish-character.model"

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character!: Character
  skirmishCharacter!: SkirmishCharacter
  text = TextResourceService
  protected id!: number

  constructor(public characterService: CharacterService,
              protected route: ActivatedRoute,
              protected router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id']
        this.character = <Character>this.characterService.getCharacter(this.id)
      }
    )
  }

  onEditCharacter() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.onEditCharacter()
    }
  }
}
