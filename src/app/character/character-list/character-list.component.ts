import {Component, OnInit} from '@angular/core';
import {Character} from "../../model/character.model";
import {CharacterService} from "../character-service/character.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters!: Character[];

  constructor(private characterService: CharacterService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.characters = this.characterService.getCharacters();
  }

  onAddCharacter() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
