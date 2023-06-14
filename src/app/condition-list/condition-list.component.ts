import {Component, OnInit} from '@angular/core';
import {TextResourceService} from "../shared/services/text-resource-service/text-resource.service";
import {ConditionService} from "../shared/services/condition-service/condition.service";
import {Condition} from "../model/condition/condition.model";

@Component({
  selector: 'app-condition-list',
  templateUrl: './condition-list.component.html',
  styleUrls: ['./condition-list.component.css']
})
export class ConditionListComponent implements OnInit{
  conditionList!: Condition[]
  text = TextResourceService
  conditionColumns: string[] = ['name', 'description']

  constructor(private conditionService: ConditionService) {
  }

  ngOnInit(): void {
    this.conditionList = this.conditionService.conditionsList
  }
}
