import {Component, Input} from '@angular/core';
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {CharacteristicsEnum} from "../../../utils/enums";
import {CharacterCharacteristic} from "../../../../core/model/characteristic/character-characteristic.model";
import {Model} from "../../../../core/model/model";

@Component({
  selector: 'app-characteristics-edit',
  templateUrl: './characteristics-edit.component.html',
  styleUrls: ['./characteristics-edit.component.css']
})
export class CharacteristicsEditComponent {
  @Input() editCharacterForm!: FormGroup
  text = TextResourceService

  characteristicsColumns: string[] = this.fillCharacteristicsColumn()

  public static initCharacteristicsTable(characteristics: CharacterCharacteristic[]) {
    if(characteristics != undefined) {
      return this.initFilledCharacteristicsTable(characteristics)
    } else {
      return this.initEmptyCharacteristicsTable()
    }
  }

  private static initEmptyCharacteristicsTable() {
    const characteristics: string[] = Object.values(CharacteristicsEnum)
      .filter(value => typeof value === 'string') as string[];

    return new UntypedFormArray(characteristics.map(characteristic => (
      new UntypedFormGroup({
        'id': new UntypedFormControl(null),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic(characteristic)),
        'value': new UntypedFormControl(null)
      })
    )))
  }

  private static initFilledCharacteristicsTable(characteristics: CharacterCharacteristic[]) {
    return new UntypedFormArray(characteristics.map(characteristic => (
      new UntypedFormGroup({
        'id': new UntypedFormControl(characteristic.characteristic.id),
        'characteristic': new UntypedFormControl(this.prepareCharacteristic(characteristic.characteristic.name)),
        'value': new UntypedFormControl(characteristic.value)
      })
    )))
  }

  protected static prepareCharacteristic(name: string) {
    return new Model(name, TextResourceService.getCharacteristicNameTranslation(name).nameTranslation)
  }

  get characteristics() {
    return (<UntypedFormArray>this.editCharacterForm.get('characteristics')).controls
  }

  protected fillCharacteristicsColumn() {
    return Object.values(CharacteristicsEnum)
      .filter(value => typeof value === 'string') as string[];
  }
}
