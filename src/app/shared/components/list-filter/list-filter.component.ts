import {Component, EventEmitter, Output} from '@angular/core';
import {TextResourceService} from "../../../core/services/text-resource-service/text-resource.service";

@Component({
    selector: 'app-list-filter',
    templateUrl: './list-filter.component.html',
    styleUrls: ['./list-filter.component.css'],
    standalone: false
})
export class ListFilterComponent {
  @Output() filterValueChanged = new EventEmitter<string>();
  text = TextResourceService;

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValueChanged.emit(filterValue);
  }
}
