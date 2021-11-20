import {Component, OnInit} from '@angular/core';
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {Subscription} from "rxjs";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InitiativeDialogWindow} from "../../dialog-window/initiative-dialog-window/initiative-dialog-window.component";
import {ConditionService} from "../../shared/services/condition-service/condition.service";
import {RoundService} from "../../shared/services/round-service/round.service";

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
              private conditionService: ConditionService,
              private roundService: RoundService) {
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
    this.skirmishCharacters.sort(this.compareSkirmishCharactersInitiative);
  }

  compareSkirmishCharactersInitiative(a: SkirmishCharacter, b: SkirmishCharacter) {
    if (a.skirmishInitiative < b.skirmishInitiative) {
      return 1;
    }
    if (a.skirmishInitiative > b.skirmishInitiative) {
      return -1;
    }
    return 0;
  }

  endTurn() {
    this.roundService.nextRound();
    this.roundNumber = this.roundService.roundNumber;
    this.checkCharacterConditions();
  }

  private checkCharacterConditions() {
    for (let character of this.skirmishCharacters) {
      this.conditionService.endTurnCheckConditions(character)
    }
  }
}
