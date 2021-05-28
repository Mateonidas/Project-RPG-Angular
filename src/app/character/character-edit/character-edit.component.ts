import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, NgForm} from "@angular/forms";
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
  characterForm!: FormGroup;
  id!: number;
  editMode = false;


  constructor(private route: ActivatedRoute,
              private router: Router) {
    // @ts-ignore
    this.skillsList = Object.keys(this.skillsListEnum);
    console.log(this.skillsList)
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    let characterName = '';
    let characterDescription = '';
    let characteristics = new FormArray([
      new FormGroup({
        'name': new FormControl('Sz'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('WW'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('US'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('S'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('Wt'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('I'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('Zw'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('Zr'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('Int'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('SW'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('Ogd'),
        'value': new FormControl('')
      }),
      new FormGroup({
        'name': new FormControl('Żyw'),
        'value': new FormControl('')
      }),
    ]);
    let skills = new FormArray([]);


    this.characterForm = new FormGroup({
      'name': new FormControl(characterName),
      'description': new FormControl(characterDescription),
      'characteristics': characteristics,
      'skills': skills
    });
  }

  get characteristics(){
    return (<FormArray>this.characterForm.get('characteristics')).controls;
  }

  get skills(){
    return (<FormArray>this.characterForm.get('skills')).controls;
  }

  onSubmit() {
    console.log(this.characterForm.value);
  }

  onAddSkill() {
    (<FormArray>this.characterForm.get('skills')).push(
      new FormGroup({
        'name': new FormControl(null),
        'value': new FormControl(null)
      })
    )
  }

  onDeleteSkill(i: number) {

  }
}
