import {Component, OnInit} from '@angular/core';
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {Subscription} from "rxjs";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InitiativeDialogWindow} from "../../dialog-window/initiative-dialog-window/initiative-dialog-window.component";
import {RoundService} from "../../shared/services/round-service/round.service";
import {SkirmishService} from "../../shared/services/skirmish-service/skirmish.service";

@Component({
  selector: 'app-skirmish-characters-list',
  templateUrl: './skirmish-characters-list.component.html',
  styleUrls: ['./skirmish-characters-list.component.css']
})
export class SkirmishCharactersListComponent implements OnInit {
  skirmishCharacters!: SkirmishCharacter[];
  subscription!: Subscription;
  roundNumber!: number;

  constructor(private skirmishCharacterService: SkirmishCharacterService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private roundService: RoundService,
              private skirmishService: SkirmishService) {
  }

  ngOnInit(): void {
    this.subscription = this.skirmishCharacterService.skirmishCharactersChanged.subscribe(
      (skirmishCharacters: SkirmishCharacter[]) => {
        this.skirmishCharacters = skirmishCharacters;
      }
    )
    this.skirmishCharacters = this.skirmishCharacterService.getSkirmishCharacters();
    this.roundNumber = this.roundService.roundNumber;
    this.sortByInitiative();
  }

  initiativeRolls() {
    for (let skirmishCharacter of this.skirmishCharacters) {
      const modalRef = this.modalService.open(InitiativeDialogWindow);
      modalRef.componentInstance.name = skirmishCharacter.name;
      modalRef.componentInstance.rollEntry.subscribe((rollValue: number) => {
        skirmishCharacter.skirmishInitiative += rollValue;
        this.skirmishCharacterService.updateSkirmishCharacter(skirmishCharacter);
      })
    }
  }

  sortByInitiative() {
    this.skirmishService.sortByInitiative(this.skirmishCharacters).then(() => {
      this.skirmishCharacters = this.skirmishCharacterService.getSkirmishCharacters();
    });
  }

  async endTurn() {
    await this.roundService.nextRound(this.skirmishCharacters);
    this.roundNumber = this.roundService.roundNumber;
    // await this.checkCharacterConditions();
  }

  private async checkCharacterConditions() {
    for (let character of this.skirmishCharacters) {
      // await this.conditionService.endTurnCheckConditions(character)
    }
  }

  clearData() {
    localStorage.clear();
    window.location.reload();
  }
}
