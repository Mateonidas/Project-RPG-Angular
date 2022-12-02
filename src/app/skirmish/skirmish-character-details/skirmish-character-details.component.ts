import {Component, HostListener, OnInit} from '@angular/core';
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {CharacterDetailComponent} from "../../character/character-detail/character-detail.component";
import {CharacterService} from "../../shared/services/character-service/character.service";
import {MatDialog} from "@angular/material/dialog";
import {ReceiveDamageDialog} from "../../dialog-window/receive-damage-dialog/receive-damage-dialog.component";
import {SkirmishService} from "../../shared/services/skirmish-service/skirmish.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-skirmish-character-details',
  templateUrl: '../../character/character-detail/character-detail.component.html',
  styleUrls: ['../../character/character-detail/character-detail.component.css']
})
export class SkirmishCharacterDetailsComponent extends CharacterDetailComponent implements OnInit {

  character!: SkirmishCharacter;
  isSkirmishMode = true;

  constructor(public characterService: CharacterService,
              public skirmishCharacterService: SkirmishCharacterService,
              public skirmishService: SkirmishService,
              protected route: ActivatedRoute,
              protected router: Router,
              private dialog: MatDialog,
              protected bottomSheet: MatBottomSheet) {
    super(characterService, skirmishCharacterService, route, router, bottomSheet);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.character = this.skirmishCharacterService.getSkirmishCharacter(this.id);
      }
    )
  }

  onDeleteCharacter() {
    this.skirmishCharacterService.removeSkirmishCharacter(this.id);
    this.router.navigate(['skirmish']);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.onEditCharacter();
    }
  }

  async onReceiveDamage() {
    const dialogRef = this.dialog.open(ReceiveDamageDialog, {
      width: '20%',
      data: this.character,
    });

    dialogRef.afterClosed().subscribe(async receivedDamage => {
      if (receivedDamage != undefined) {
        await this.skirmishService.receiveDamage(receivedDamage);
        await this.reloadSkirmishCharacters();
      }
    })
  }

  async addAdvantagePoint() {
    await this.skirmishService.addAdvantagePoint(this.character.id);
    await this.reloadSkirmishCharacters();
  }

  async removeAdvantagePoint() {
    await this.skirmishService.removeAdvantagePoint(this.character.id);
    await this.reloadSkirmishCharacters();
  }

  async reloadSkirmishCharacters() {
    await this.skirmishCharacterService.fetchSkirmishCharacter();
    this.character = this.skirmishCharacterService.getSkirmishCharacter(this.id);
  }
}
