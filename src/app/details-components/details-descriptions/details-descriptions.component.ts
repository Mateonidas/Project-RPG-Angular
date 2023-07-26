import {Component, Input} from '@angular/core';
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {Character} from "../../model/character/character.model";

@Component({
  selector: 'app-details-descriptions',
  templateUrl: './details-descriptions.component.html',
  styleUrls: ['./details-descriptions.component.css']
})
export class DetailsDescriptionsComponent {
  text = TextResourceService
  @Input() character!: Character
}
