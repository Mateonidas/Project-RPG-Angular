import { Component, OnInit } from '@angular/core';
import {SkirmishService} from "../skirmish-service/skirmish.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SkirmishCharacter} from "../../model/skirmish-character.model";

@Component({
  selector: 'app-skirmish-character-details',
  templateUrl: './skirmish-character-details.component.html',
  styleUrls: ['./skirmish-character-details.component.css']
})
export class SkirmishCharacterDetailsComponent implements OnInit {

  skirmishCharacter!: SkirmishCharacter;
  private id!: number;

  constructor(private skirmishService: SkirmishService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.skirmishCharacter = this.skirmishService.getSkirmishCharacter(this.id);
      }
    )
  }

  onEditCharacter() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
