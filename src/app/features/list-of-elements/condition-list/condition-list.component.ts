import {Component, OnInit} from '@angular/core';
import {TextResourceService} from "../../../core/services/text-resource-service/text-resource.service";
import {ConditionService} from "../../../core/services/condition-service/condition.service";
import {Condition} from "../../../core/model/condition/condition.model";

@Component({
    selector: 'app-condition-list',
    templateUrl: './condition-list.component.html',
    styleUrls: ['./condition-list.component.css'],
    standalone: false
})
export class ConditionListComponent implements OnInit{
  conditions!: Condition[];
  text = TextResourceService;
  filterValue?: string;

  constructor(private conditionService: ConditionService) {
  }

  ngOnInit(): void {
    this.conditions = this.conditionService.conditionsList
  }

  applyFilter(newFilterValue: string) {
    this.filterValue = newFilterValue;
  }
}
