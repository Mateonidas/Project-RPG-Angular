import {Component, OnInit} from '@angular/core';
import {SpellGroup} from "../../../core/model/spell/spell-group.model";
import {TextResourceService} from "../../../core/services/text-resource-service/text-resource.service";
import {SpellService} from "../../../core/services/spell-service/spell.service";

@Component({
  selector: 'app-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.css']
})
export class SpellListComponent implements OnInit{
  spellGroups!: SpellGroup[]
  text = TextResourceService
  filterValue?: string;

  constructor(private spellService: SpellService) {}

  ngOnInit(): void {
    this.spellGroups = this.spellService.spellGroups;
  }

  applyFilter(newFilterValue: string) {
    this.filterValue = newFilterValue;
  }
}
