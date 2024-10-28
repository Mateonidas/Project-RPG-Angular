import {Component, Input} from '@angular/core';
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
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
    if (characteristics != undefined) {
      return this.initFilledCharacteristicsTable(characteristics)
    } else {
      return this.initEmptyCharacteristicsTable()
    }
  }

  private static initEmptyCharacteristicsTable() {
    const formBuilder = new FormBuilder();

    const characteristics: string[] = Object.values(CharacteristicsEnum)
      .filter(value => typeof value === 'string') as string[];

    return formBuilder.array(characteristics.map(characteristic => (
      formBuilder.group({
        'id': [null],
        'characteristic': [this.prepareCharacteristic(characteristic)],
        'value': [null]
      })
    )))
  }

  private static initFilledCharacteristicsTable(characteristics: CharacterCharacteristic[]) {
    const formBuilder = new FormBuilder();
    return formBuilder.array(characteristics.map(characteristic => (
      formBuilder.group({
        'id': [characteristic.characteristic.id],
        'characteristic': [this.prepareCharacteristic(characteristic.characteristic.name)],
        'value': [characteristic.value]
      })
    )))
  }

  protected static prepareCharacteristic(name: string) {
    return new Model(name, TextResourceService.getTranslation("characteristics", name).nameTranslation)
  }

  get characteristics() {
    return (<FormArray>this.editCharacterForm.get('characteristics')).controls
  }

  protected fillCharacteristicsColumn() {
    return Object.values(CharacteristicsEnum)
      .filter(value => typeof value === 'string') as string[];
  }
}
