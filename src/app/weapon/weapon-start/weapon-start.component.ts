import { Component } from '@angular/core';
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";

@Component({
  selector: 'app-weapon-start',
  templateUrl: './weapon-start.component.html',
  styleUrls: ['./weapon-start.component.css']
})
export class WeaponStartComponent {

  text = TextResourceService

}
