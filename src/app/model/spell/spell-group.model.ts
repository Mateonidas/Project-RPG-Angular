import {Spell} from "./spell.model";

export class SpellGroup {
  public name: string;
  public spells: Spell[];

  constructor(name: string, spells: Spell[]) {
    this.name = name;
    this.spells = spells;
  }
}
