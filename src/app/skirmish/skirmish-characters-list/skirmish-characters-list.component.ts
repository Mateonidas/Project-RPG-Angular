import {Component, OnInit} from '@angular/core';
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {Subscription} from "rxjs";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoundService} from "../../shared/services/round-service/round.service";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {MatDialog} from "@angular/material/dialog";
import {InitiativeDialog} from "../../dialog-window/initiative-dialog/initiative-dialog.component";

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
    const dialogRef = this.dialog.open(InitiativeDialog, {
      width: '20%',
      data: this.skirmishCharacters.slice(),
    });

    dialogRef.afterClosed().subscribe(skirmishCharacters => {
      this.skirmishCharacterService.updateSkirmishCharacters(skirmishCharacters)
    })
  }

  clearData() {
    this.skirmishCharacterService.removeAllSkirmishCharacters();
    this.roundService.clearData();
    this.roundNumber = this.roundService.roundNumber;
    this.router.navigate(['skirmish']);
  }
}
