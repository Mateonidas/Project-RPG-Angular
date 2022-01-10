import {Model} from "../model";
import {WeaponType} from "./attack-category.model";

export class AttackType extends Model {
  public category!: WeaponType;

  constructor(name: string, nameTranslation: string, category: WeaponType) {
    super(name, nameTranslation);
    this.category = category;
  }
}


