import {Component, OnInit} from '@angular/core';
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {Subscription} from "rxjs";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InitiativeDialog} from "../../dialog-window/initiative-dialog/initiative-dialog.component";
import {RoundService} from "../../shared/services/round-service/round.service";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-skirmish-characters-list',
  templateUrl: './skirmish-characters-list.component.html',
  styleUrls: ['./skirmish-characters-list.component.css']
})
export class SkirmishCharactersListComponent implements OnInit {
  skirmishCharacters!: SkirmishCharacter[];
  subscription!: Subscription;
  roundNumber!: number;

  text = TextResourceService;

  constructor(private skirmishCharacterService: SkirmishCharacterService,
              private router: Router,
              private route: ActivatedRoute,
              private roundService: RoundService,
              private dialog: MatDialog) {
  }

  async ngOnInit() {
    this.subscription = this.skirmishCharacterService.skirmishCharactersChanged.subscribe(
      (skirmishCharacters: SkirmishCharacter[]) => {
        this.skirmishCharacters = skirmishCharacters;
      }
    )

    this.roundNumber = this.roundService.roundNumber;
    
    this.skirmishCharacters = this.skirmishCharacterService.getSkirmishCharacters();
  }

  async endTurn() {
    await this.roundService.nextRound();
    this.roundNumber = this.roundService.roundNumber;

    await this.reloadSkirmishCharacters();
  }

  async reloadSkirmishCharacters() {
    await this.skirmishCharacterService.fetchSkirmishCharacter();
    this.skirmishCharacters = this.skirmishCharacterService.getSkirmishCharacters();
  }

  initiativeRolls() {
    for (let skirmishCharacter of this.skirmishCharacters) {
      const dialogRef = this.dialog.open(InitiativeDialog, {
        width: '20%',
        data: skirmishCharacter.name,
      });

      dialogRef.afterClosed().subscribe(rollValue => {
        if (rollValue != undefined) {
          skirmishCharacter.skirmishInitiative += rollValue;
          this.skirmishCharacterService.updateSkirmishCharacter(skirmishCharacter);
        }
      })
    }
  }

  clearData() {
    this.skirmishCharacterService.removeAllSkirmishCharacters();
    this.roundService.clearData();
    this.roundNumber = this.roundService.roundNumber;
    this.router.navigate(['skirmish']);
  }
}
