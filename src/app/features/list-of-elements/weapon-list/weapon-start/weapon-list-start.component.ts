import { Component } from '@angular/core';
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";

@Component({
    selector: 'app-weapon-list-start',
    templateUrl: './weapon-list-start.component.html',
    styleUrls: ['./weapon-list-start.component.css'],
    standalone: false
})
export class WeaponListStartComponent {

  text = TextResourceService

}
