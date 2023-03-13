import {Component, Input, OnInit} from '@angular/core';
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";

@Component({
  selector: 'app-skirmish-character-item',
  templateUrl: './skirmish-character-item.component.html',
  styleUrls: ['./skirmish-character-item.component.css']
})
export class SkirmishCharacterItemComponent implements OnInit {
  @Input() skirmishCharacter!: SkirmishCharacter;
  @Input() index!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
