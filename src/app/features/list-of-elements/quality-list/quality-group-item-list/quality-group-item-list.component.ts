import {Component, Input} from '@angular/core';
import {Model} from "../../../../core/model/model";
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";

@Component({
  selector: 'app-quality-group-item-list',
  templateUrl: './quality-group-item-list.component.html',
  styleUrls: ['./quality-group-item-list.component.css']
})
export class QualityGroupItemListComponent {
  @Input() title!: string
  @Input() qualityGroup!: Model[];
  test = TextResourceService;
  columns: string[] = ['name', 'description'];
  protected readonly text = TextResourceService;
}
