import {Model} from "../model";

export class Trait extends Model {
  public hasValue: boolean;


  constructor(name?: string, nameTranslation?: string, hasValue?: boolean) {
    super(name, nameTranslation);
    this.hasValue = <boolean>hasValue;
  }

  static fromJSON(object: Object): Trait {
    return Object.assign(new Trait(), object);
  }

  static arrayFromJSON(objectsArray: Object[]): Trait[] {
    let traits = [];
    for (let object of objectsArray) {
      let trait = Trait.fromJSON(object);
      traits.push(trait);
    }
    return traits;
  }
}
