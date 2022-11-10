import { Component, OnInit } from '@angular/core';
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";

@Component({
  selector: 'app-character-start',
  templateUrl: './character-start.component.html',
  styleUrls: ['./character-start.component.css']
})
export class CharacterStartComponent implements OnInit {

  text = TextResourceService;

  constructor() { }

  ngOnInit(): void {
  }

}
