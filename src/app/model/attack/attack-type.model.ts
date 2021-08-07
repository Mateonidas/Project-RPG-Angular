import {Model} from "../model";
import {AttackCategory} from "./attack-category.model";

export class AttackType extends Model {
  public category!: AttackCategory;

  constructor(name: string, nameTranslation: string, category: AttackCategory) {
    super(name, nameTranslation);
    this.category = category;
  }
}


