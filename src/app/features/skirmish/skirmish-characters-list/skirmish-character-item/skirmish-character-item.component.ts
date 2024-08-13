import {Component, Input, OnInit} from '@angular/core';
import {SkirmishCharacter} from "../../../../core/model/skirmish/skirmish-character.model";
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";

@Component({
  selector: 'app-skirmish-character-item',
  templateUrl: './skirmish-character-item.component.html',
  styleUrls: ['./skirmish-character-item.component.css']
})
export class SkirmishCharacterItemComponent implements OnInit {
  @Input() skirmishCharacter!: SkirmishCharacter;
  @Input() index!: number;

  text = TextResourceService;

  constructor() { }

  ngOnInit(): void {
  }

}
