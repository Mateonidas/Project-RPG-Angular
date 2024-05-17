import {Component, HostListener, OnInit} from '@angular/core'
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service"
import {ActivatedRoute, Params, Router} from "@angular/router"
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model"
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-skirmish-character-details',
  templateUrl: './skirmish-character-details.component.html',
  styleUrls: ['./skirmish-character-details.component.css']
})
export class SkirmishCharacterDetailsComponent implements OnInit {

  skirmishCharacter!: SkirmishCharacter
  text = TextResourceService
  subscription!: Subscription
  protected id!: number

  constructor(public skirmishCharacterService: SkirmishCharacterService,
              protected route: ActivatedRoute,
              protected router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id']
        this.skirmishCharacter = this.skirmishCharacterService.getSkirmishCharacter(this.id)
      }
    )

    this.subscription = this.skirmishCharacterService.skirmishCharactersChanged.subscribe(
      (skirmishCharacters: SkirmishCharacter[]) => {
        let updatedCharacter = skirmishCharacters.find(skirmishCharacter => skirmishCharacter.id == this.skirmishCharacter.id)
        if(updatedCharacter instanceof SkirmishCharacter) {
          this.skirmishCharacter = updatedCharacter
        }
      }
    )
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.onEditCharacter()
    }
  }

  onEditCharacter() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
}
