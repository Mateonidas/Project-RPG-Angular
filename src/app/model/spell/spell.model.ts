import {Model} from "../model";

export class Spell extends Model {
  public spellGroup: Model;


  constructor(name?: string, nameTranslation?: string, id?: number, description?: string, spellGroup?: Model) {
    super(name, nameTranslation, id, description);
    this.spellGroup = <Model>spellGroup;
  }

  static fromJSON(object: Object): Spell {
    const spell = Object.assign(new Spell(), object);
    spell.spellGroup = Model.fromJSON(spell['spellGroup']);
    return spell;
  }

  static arrayFromJSON(objectsArray: Object[]): Spell[] {
    const spells = [];
    for (const object of objectsArray) {
      const spell = Spell.fromJSON(object);
      spells.push(spell);
    }
    return spells;
  }
}
