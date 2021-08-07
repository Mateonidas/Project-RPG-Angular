import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AttacksCategoryList} from "../../../model/attack/attacks-category-list.model";
import {AttacksTypeList} from "../../../model/attack/attacks-type-list.model";

@Component({
  selector: 'app-skirmish-actions-attack',
  templateUrl: './skirmish-actions-attack.component.html',
  styleUrls: ['./skirmish-actions-attack.component.css']
})
export class SkirmishActionsAttackComponent implements OnInit {

  attackForm!: FormGroup;
  attacksTypeList = AttacksTypeList.attacksTypeList;
  attacksCategoryList = AttacksCategoryList.attacksCategoryList;
  id!: number;
  //Kategoria ataku
  //Rodzaj ataku
  //Używana broń

  //Do klasy parent:
  //Rzut
  //Modyfikator

  constructor(protected router: Router,
              protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.initForm();
      }
    )
  }

  private initForm() {
    this.attackForm = new FormGroup({
      'attackCategory': new FormControl(null),
      'attackType': new FormControl(null),
      'roll': new FormControl(null),
      'modifier': new FormControl(null),
    })

    this.attacksTypeList = AttacksTypeList.attacksTypeList.filter(x => x.category.name === 'MeleeAttack');
  }

  onSubmit() {

  }

  onCategoryChange() {
    let category = this.attackForm.get('attackCategory')?.value.name;
    this.attacksTypeList = AttacksTypeList.attacksTypeList.filter(x => x.category.name === category);
  }
}
