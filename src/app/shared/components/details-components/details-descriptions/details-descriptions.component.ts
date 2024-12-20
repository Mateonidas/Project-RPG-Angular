import {Component, Input} from '@angular/core';
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {Character} from "../../../../core/model/character/character.model";

@Component({
    selector: 'app-details-descriptions',
    templateUrl: './details-descriptions.component.html',
    styleUrls: ['./details-descriptions.component.css'],
    standalone: false
})
export class DetailsDescriptionsComponent {
  text = TextResourceService
  @Input() character!: Character
}
