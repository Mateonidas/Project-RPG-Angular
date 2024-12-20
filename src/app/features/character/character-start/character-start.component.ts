import { Component, OnInit } from '@angular/core';
import {TextResourceService} from "../../../core/services/text-resource-service/text-resource.service";

@Component({
    selector: 'app-character-start',
    templateUrl: './character-start.component.html',
    styleUrls: ['./character-start.component.css'],
    standalone: false
})
export class CharacterStartComponent implements OnInit {

  text = TextResourceService;

  constructor() { }

  ngOnInit(): void {
  }

}
