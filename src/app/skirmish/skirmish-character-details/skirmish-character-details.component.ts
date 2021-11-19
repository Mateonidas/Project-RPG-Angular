import { Component, OnInit } from '@angular/core';
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";

@Component({
  selector: 'app-skirmish-character-details',
  templateUrl: './skirmish-character-details.component.html',
  styleUrls: ['./skirmish-character-details.component.css']
})
export class SkirmishCharacterDetailsComponent implements OnInit {

  skirmishCharacter!: SkirmishCharacter;
  private id!: number;

  constructor(private skirmishService: SkirmishCharacterService,
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
