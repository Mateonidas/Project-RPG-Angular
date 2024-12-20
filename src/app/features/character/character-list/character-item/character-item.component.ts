import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../../../core/model/character/character.model";

@Component({
    selector: 'app-character-item',
    templateUrl: './character-item.component.html',
    styleUrls: ['./character-item.component.css'],
    standalone: false
})
export class CharacterItemComponent implements OnInit {
  @Input() character!: Character;
  @Input() index!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
