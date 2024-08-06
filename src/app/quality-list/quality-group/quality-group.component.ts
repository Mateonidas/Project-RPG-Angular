import {Component, Input} from '@angular/core';
import {Model} from "../../model/model";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";

@Component({
  selector: 'app-quality-group',
  templateUrl: './quality-group.component.html',
  styleUrls: ['./quality-group.component.css']
})
export class QualityGroupComponent {
  @Input() title!: string
  @Input() qualityGroup!: Model[];
  test = TextResourceService;
  columns: string[] = ['name', 'description'];
  protected readonly text = TextResourceService;
}
