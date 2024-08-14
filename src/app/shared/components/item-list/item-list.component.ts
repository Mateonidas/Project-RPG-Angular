import {Component, Input} from '@angular/core';
import {Model} from "../../../core/model/model";
import {TextResourceService} from "../../../core/services/text-resource-service/text-resource.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  @Input() title!: string
  @Input() qualityGroup!: Model[];
  test = TextResourceService;
  columns: string[] = ['name', 'description'];
  protected readonly text = TextResourceService;
}
