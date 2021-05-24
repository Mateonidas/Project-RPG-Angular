export class Characteristic {
  public movement: number;
  public weaponSkill: number;
  public ballisticSkill: number;
  public strength: number;
  public toughness: number;
  public initiative: number;
  public agility: number;
  public dexterity: number;
  public intelligence: number;
  public willpower: number;
  public fellowship: number;
  public wounds: number;


  constructor(movement: number, weaponSkill: number, ballisticSkill: number, strength: number, toughness: number, initiative: number, agility: number, dexterity: number, intelligence: number, willpower: number, fellowship: number, wounds: number) {
    this.movement = movement;
    this.weaponSkill = weaponSkill;
    this.ballisticSkill = ballisticSkill;
    this.strength = strength;
    this.toughness = toughness;
    this.initiative = initiative;
    this.agility = agility;
    this.dexterity = dexterity;
    this.intelligence = intelligence;
    this.willpower = willpower;
    this.fellowship = fellowship;
    this.wounds = wounds;
  }
}
