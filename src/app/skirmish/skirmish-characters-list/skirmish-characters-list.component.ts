import { Component, OnInit } from '@angular/core';
import {SkirmishCharacter} from "../../model/skirmish-character.model";
import {Subscription} from "rxjs";
import {SkirmishService} from "../skirmish-service/skirmish.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InitiativeDialogWindow} from "../../dialog-window/initiative-dialog-window/initiative-dialog-window.component";

@Component({
  selector: 'app-skirmish-characters-list',
  templateUrl: './skirmish-characters-list.component.html',
  styleUrls: ['./skirmish-characters-list.component.css']
})
export class SkirmishCharactersListComponent implements OnInit {
  skirmishCharacters!: SkirmishCharacter[];
  subscription!: Subscription;

  constructor(private skirmishService: SkirmishService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.subscription = this.skirmishService.skirmishCharactersChanged.subscribe(
      (skirmishCharacters: SkirmishCharacter[]) => {
        this.skirmishCharacters = skirmishCharacters;
      }
    )
    this.skirmishCharacters = this.skirmishService.getSkirmishCharacters();
  }

  initiativeRolls() {
    for (let skirmishCharacter of this.skirmishCharacters) {
      console.log(skirmishCharacter.name)
      const modalRef = this.modalService.open(InitiativeDialogWindow);
      modalRef.componentInstance.name = skirmishCharacter.name;
      modalRef.componentInstance.rollEntry.subscribe((rollValue: number) => {
        skirmishCharacter.temporaryParameters.skirmishInitiative += rollValue;
      })
    }
  }

  sortByInitiative() {
    this.skirmishCharacters.sort(this.compareSkirmishCharactersInitiative);
  }

  compareSkirmishCharactersInitiative(a: SkirmishCharacter, b: SkirmishCharacter) {
    if(a.temporaryParameters.skirmishInitiative < b.temporaryParameters.skirmishInitiative) {
      return 1;
    }
    if(a.temporaryParameters.skirmishInitiative > b.temporaryParameters.skirmishInitiative) {
      return -1;
    }
    return 0;
  }
}
