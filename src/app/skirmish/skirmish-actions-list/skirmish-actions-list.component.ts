import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-actions-list',
  templateUrl: './skirmish-actions-list.component.html',
  styleUrls: ['./skirmish-actions-list.component.css']
})
export class SkirmishActionsListComponent implements OnInit {

  id!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    })
  }

}
