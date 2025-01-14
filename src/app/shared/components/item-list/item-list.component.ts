import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Model} from "../../../core/model/model";
import {TextResourceService} from "../../../core/services/text-resource-service/text-resource.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.css'],
    standalone: false
})
export class ItemListComponent implements OnInit, OnChanges {
  @Input() title!: string;
  @Input() qualityGroup!: Model[];
  @Input() filterValue?: string;
  text = TextResourceService;
  dataSource = new MatTableDataSource();
  columns: string[] = ['name', 'description'];
  hasData: boolean = true;

  ngOnInit(): void {
    this.dataSource.data = this.qualityGroup;
    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterValue']) {
      this.applyFilter();
    }
  }

  applyFilter() {
    if (this.filterValue != undefined) {
      const filter = this.filterValue.trim().toLowerCase();
      const titleMatches = this.title.toLowerCase().includes(filter);

      if (titleMatches) {
        this.dataSource.filter = '';
      } else {
        this.dataSource.filter = filter;
      }

      this.hasData = this.dataSource.filteredData.length > 0 || titleMatches;
    }
  }


  customFilterPredicate(data: any, filter: string): boolean {
    const name = data.nameTranslation ? data.nameTranslation.toLowerCase() : '';
    return name.includes(filter);
  }
}

