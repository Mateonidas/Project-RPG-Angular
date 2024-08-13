import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormGroup, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {Model} from "../../../../core/model/model";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit {
  @Input() editCharacterForm!: FormGroup;
  @Input() formArrayName!: string;
  @Input() list!: Model[]
  @Input() titleLabel!: string;
  @Input() addButtonLabel!: string;
  @Input() additionalData?: any[];
  text = TextResourceService;
  filteredList: Observable<Model[]>[] = []

  ngOnInit() {
    this.initializeFilteredList()
  }

  initializeFilteredList() {
    this.filteredList = [];
    this.formArrays.forEach(group => {
      const control = group.get('model') as UntypedFormControl;
      this.filteredList.push(control?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.nameTranslation)),
        map(name => (name ? this._filter(name) : this.list.slice()))
      ));
    })
  }

  onAddFormArray() {
    (this.editCharacterForm.get(this.formArrayName) as FormArray).push(this.createFormArray());
  }

  createFormArray(): UntypedFormGroup {
    const control = new UntypedFormControl('');
    this.filteredList.push(control.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.nameTranslation)),
      map(name => (name ? this._filter(name) : this.list.slice()))
    ));
    let newFormGroup = new UntypedFormGroup({
      'model': control,
      'value': new UntypedFormControl(null)
    })

    if(this.formArrayName === 'injuries') {
      newFormGroup.addControl('bodyLocalization', new UntypedFormControl(null))
    }

    return newFormGroup;
  }

  checkIfTraitHasValue(formArray: AbstractControl) {
    const hasValue = formArray.value.model?.hasValue ?? true;
    if (formArray.value.model != null && !hasValue) {
      (<UntypedFormGroup>formArray.get('value')).disable();
    } else {
      (<UntypedFormGroup>formArray.get('value')).enable();
    }
  }

  onDeleteFormArray(index: number) {
    (this.editCharacterForm.get(this.formArrayName) as FormArray).removeAt(index);
    this.filteredList.splice(index, 1);
  }

  displayFn(model?: Model): string {
    return model ? model.nameTranslation : '';
  }

  private _filter(name: string): Model[] {
    const filterValue = name.toLowerCase();
    return this.list.filter(option => option.nameTranslation.toLowerCase().includes(filterValue));
  }

  get formArrays() {
    return (this.editCharacterForm.get(this.formArrayName) as FormArray).controls;
  }
}
