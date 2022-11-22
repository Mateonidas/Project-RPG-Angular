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
  text = TextResourceService;
  protected id!: number;
  isSkirmishMode = false;

  characteristicsColumns: string[] = this.fillCharacteristicsColumn();
  bodyLocalizationsColumns: string[] = ['name', 'armorPoints', 'injuries'];
  notesColumns: string[] = ['note'];
  spellColumns: string[] = ['spell'];
  baseColumns: string[] = ['name', 'level'];
  weaponColumns: string[] = ['name', 'category', 'reach', 'damage', 'advantagesAndDisadvantages'];
  armorsColumns: string[] = ['name', 'category', 'localization', 'armorPoints', 'penalties', 'qualities'];
  temporaryParametersColumns: string[] = ['isAlive', 'currentWounds', 'initiative', 'advantage'];

  constructor(public characterService: CharacterService,
              public skirmishCharacterService: SkirmishCharacterService,
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
    this.skirmishCharacterService.storeSkirmishCharacter(this.character);
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
    if (event.key == 'Enter') {
      this.onEditCharacter();
    }
  }

  private fillCharacteristicsColumn() {
    return [
      "MOVEMENT",
      "WEAPON_SKILL",
      "BALLISTIC_SKILL",
      "STRENGTH",
      "TOUGHNESS",
      "INITIATIVE",
      "AGILITY",
      "DEXTERITY",
      "INTELLIGENCE",
      "WILLPOWER",
      "FELLOWSHIP",
      "WOUNDS"
    ];
  }

  onReceiveDamage() {}

  addAdvantagePoint() {}

  removeAdvantagePoint() {}
}
