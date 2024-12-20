import {Component, OnInit, ViewChild} from '@angular/core';
import {SkirmishCharacter} from "../../../core/model/skirmish/skirmish-character.model";
import {Subscription} from "rxjs";
import {SkirmishCharacterService} from "../../../core/services/skirmish-character-service/skirmish-character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoundService} from "../../../core/services/round-service/round.service";
import {TextResourceService} from "../../../core/services/text-resource-service/text-resource.service";
import {MatDialog} from "@angular/material/dialog";
import {InitiativeDialog} from "./dialog-window/initiative-dialog/initiative-dialog.component";
import {MatTable} from "@angular/material/table";

@Component({
    selector: 'app-skirmish-characters-list',
    templateUrl: './skirmish-characters-list.component.html',
    styleUrls: ['./skirmish-characters-list.component.css'],
    standalone: false
})
export class SkirmishCharactersListComponent implements OnInit {
  skirmishCharacters!: SkirmishCharacter[];
  subscription!: Subscription;
  roundNumber!: number;
  fightingGroups: string[] = [];
  groupNumber = 1;

  text = TextResourceService;

  @ViewChild(MatTable) table!: MatTable<String>;

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

    this.initializeFightingGroups();
    this.initializeGroupNumber();
  }

  initializeFightingGroups() {
    const storedGroups = this.getSessionStorageItem('fightingGroups');
    this.fightingGroups = storedGroups ? JSON.parse(storedGroups) : [this.text.getText().heroesLabel];
    if (!storedGroups) {
      this.setSessionStorageItem(this.text.getText().heroesLabel, '0');
    }
  }

  initializeGroupNumber() {
    const storedGroupNumber = this.getSessionStorageItem('groupNumber');
    this.groupNumber = storedGroupNumber ? JSON.parse(storedGroupNumber) : 1;
    if (!storedGroupNumber) {
      this.setSessionStorageItem('groupNumber', JSON.stringify(this.groupNumber));
    }
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

    sessionStorage.removeItem('fightingGroups');
    sessionStorage.removeItem('groupNumber');
    this.fightingGroups.forEach(item => sessionStorage.removeItem(item));

    this.groupNumber = 1;
    this.fightingGroups = [this.text.getText().heroesLabel];
    this.setSessionStorageItem(this.text.getText().heroesLabel, '0');

    this.router.navigate(['skirmish']);
  }

  getGroupAdvantage(group: string): string | null {
    return this.getSessionStorageItem(group);
  }

  addGroupAdvantage(group: string) {
    this.updateGroupAdvantage(group, 1);
  }

  removeGroupAdvantage(group: string) {
    this.updateGroupAdvantage(group, -1);
  }

  updateGroupAdvantage(group: string, delta: number) {
    const advantages = this.getGroupAdvantage(group);
    if (advantages != null) {
      const advantagesNumber = Number.parseInt(advantages) + delta;
      this.setSessionStorageItem(group, String(advantagesNumber));
    }
  }

  onAddGroup() {
    const newGroup = `Grupa ${this.groupNumber}`;
    this.fightingGroups.push(newGroup);
    this.setSessionStorageItem(newGroup, '0');
    this.setSessionStorageItem('fightingGroups', JSON.stringify(this.fightingGroups));
    this.groupNumber++;
    this.setSessionStorageItem('groupNumber', JSON.stringify(this.groupNumber));
    this.table.renderRows();
  }

  onDeleteGroup(group: string) {
    this.fightingGroups = this.fightingGroups.filter(item => item !== group);
    this.setSessionStorageItem('fightingGroups', JSON.stringify(this.fightingGroups));
    sessionStorage.removeItem(group);
    this.table.renderRows();
  }

  private getSessionStorageItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  private setSessionStorageItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }
}
