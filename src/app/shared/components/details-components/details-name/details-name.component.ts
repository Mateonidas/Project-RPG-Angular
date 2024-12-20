import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-details-name',
    templateUrl: './details-name.component.html',
    styleUrls: ['./details-name.component.css'],
    standalone: false
})
export class DetailsNameComponent {
  @Input() name!: string;
}
