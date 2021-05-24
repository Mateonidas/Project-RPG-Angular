import {Component, OnInit} from '@angular/core';
import {Character} from "../../model/character.model";
import {CharacterService} from "../character-service/character.service";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters!: Character[];

  constructor(private characterService: CharacterService) {
  }

  ngOnInit(): void {
    this.characters = this.characterService.getCharacters();
  }

  onAddCharacter() {

  }
}
