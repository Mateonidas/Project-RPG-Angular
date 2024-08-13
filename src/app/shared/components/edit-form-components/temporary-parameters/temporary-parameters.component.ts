import {Component, Input} from '@angular/core';
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-temporary-parameters',
  templateUrl: './temporary-parameters.component.html',
  styleUrls: ['./temporary-parameters.component.css']
})
export class TemporaryParametersComponent {
  @Input() editCharacterForm!: FormGroup
  text = TextResourceService
}
