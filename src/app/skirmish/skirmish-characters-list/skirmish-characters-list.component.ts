import { Component, OnInit } from '@angular/core';
import {SkirmishCharacter} from "../../model/skirmish-character.model";
import {Subscription} from "rxjs";
import {SkirmishService} from "../skirmish-service/skirmish.service";
import {ActivatedRoute, Router} from "@angular/router";

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
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.skirmishService.skirmishCharactersChanged.subscribe(
      (skirmishCharacters: SkirmishCharacter[]) => {
        this.skirmishCharacters = skirmishCharacters;
      }
    )
    this.skirmishCharacters = this.skirmishService.getSkirmishCharacters();
  }

}
