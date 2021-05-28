import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {SkillsList} from "../../model/skill.model";

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent implements OnInit {
  @ViewChild('characterForm') participantsForm!: NgForm;
  skillsListEnum = SkillsList;
  skillsList = [];
  id!: number;
  editMode = false;


  constructor(private route: ActivatedRoute,
              private router: Router) {
    // @ts-ignore
    this.skillsList = Object.keys(this.skillsListEnum);
    console.log(this.skillsList)
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.participantsForm.form.value);
  }

  onAddSkill() {

  }
}
