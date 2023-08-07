import {Component, Input} from '@angular/core';
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-description-edit',
  templateUrl: './description-edit.component.html',
  styleUrls: ['./description-edit.component.css']
})
export class DescriptionEditComponent {
  @Input() editCharacterForm!: FormGroup
  text = TextResourceService
}
