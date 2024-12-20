import {Component} from '@angular/core';
import {TextResourceService} from "../../../../../../core/services/text-resource-service/text-resource.service";

@Component({
    selector: 'app-add-many-to-fight',
    templateUrl: './add-many-to-fight-dialog.component.html',
    styleUrls: ['./add-many-to-fight-dialog.component.css'],
    standalone: false
})
export class AddManyToFightDialog {
  number!: number;
  text = TextResourceService;
}
