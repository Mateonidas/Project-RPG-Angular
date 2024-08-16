import {Component, OnInit} from '@angular/core';
import {Model} from "../../../core/model/model";
import {TextResourceService} from "../../../core/services/text-resource-service/text-resource.service";
import {TalentService} from "../../../core/services/talent-service/talent.service";
import {TraitService} from "../../../core/services/trait-service/trait.service";

@Component({
  selector: 'app-talent-and-trait-list',
  templateUrl: './talent-and-trait-list.component.html',
  styleUrls: ['./talent-and-trait-list.component.css']
})
export class TalentAndTraitListComponent implements OnInit {
  talents!: Model[];
  traits!: Model[];
  text = TextResourceService;
  filterValue?: string;

  constructor(private talentService: TalentService,
              private traitService: TraitService) {
  }

  ngOnInit() {
    this.talents = this.talentService.talentList;
    this.traits = this.traitService.traitList;
  }

  applyFilter(newFilterValue: string) {
    this.filterValue = newFilterValue;
  }
}
