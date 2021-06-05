import { Component, OnInit } from '@angular/core';
import {Character} from "../../model/character.model";
import {CharacterService} from "../character-service/character.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character!: Character;
  private id!: number;

  constructor(private characterService: CharacterService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.character = this.characterService.getCharacter(this.id);
      }
    )
  }

  onAddToFight() {

  }

  onEditCharacter() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteCharacter() {

  }
}
