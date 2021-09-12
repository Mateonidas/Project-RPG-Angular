import {Model} from "./model";

export class Characteristic extends Model {
  public value: number;

  constructor(name: string, nameTranslation: string, value: number) {
    super(name, nameTranslation);
    this.value = value;
  }
}

export class Characteristics {
  private _characteristics = [
    new Characteristic('Movement', 'Szybkość', 0),
    new Characteristic('WeaponSkill', 'Walka Wręcz', 0),
    new Characteristic('BallisticSkill', 'Umiejętności Strzeleckie', 0),
    new Characteristic('Strength', 'Siła', 0),
    new Characteristic('Toughness', 'Wytrzymałość', 0),
    new Characteristic('Initiative', 'Intuicja', 0),
    new Characteristic('Agility', 'Zwinność', 0),
    new Characteristic('Dexterity', 'Zręczność', 0),
    new Characteristic('Intelligence', 'Inteligencja', 0),
    new Characteristic('Willpower', 'Siła Woli', 0),
    new Characteristic('Fellowship', 'Ogłada', 0),
    new Characteristic('Wounds', 'Żywotność', 0),
  ]

  constructor(movement: number, weaponSkill: number, ballisticSkill: number, strength: number, toughness: number, initiative: number, agility: number, dexterity: number, intelligence: number, willpower: number, fellowship: number, wounds: number) {
    this.movement.value = movement;
    this.weaponSkill.value = weaponSkill;
    this.ballisticSkill.value = ballisticSkill;
    this.strength.value = strength;
    this.toughness.value = toughness;
    this.initiative.value = initiative;
    this.agility.value = agility;
    this.dexterity.value = dexterity;
    this.intelligence.value = intelligence;
    this.willpower.value = willpower;
    this.fellowship.value = fellowship;
    this.wounds.value = wounds;
  }

  private getCharacteristicByName(name: string): Characteristic {
    return <Characteristic>this._characteristics.find(x => x.name == name);
  }

  get characteristics(): Characteristic[] {
    return this._characteristics;
  }

  get movement(): Characteristic {
    return this.getCharacteristicByName('Movement');
  }

  get weaponSkill(): Characteristic {
    return this.getCharacteristicByName('WeaponSkill');
  }

  get ballisticSkill(): Characteristic {
    return this.getCharacteristicByName('BallisticSkill');
  }

  get strength(): Characteristic {
    return this.getCharacteristicByName('Strength');
  }

  get toughness(): Characteristic {
    return this.getCharacteristicByName('Toughness');
  }


  get initiative(): Characteristic {
    return this.getCharacteristicByName('Initiative');
  }

  get agility(): Characteristic {
    return this.getCharacteristicByName('Agility');
  }

  get dexterity(): Characteristic {
    return this.getCharacteristicByName('Dexterity');
  }

  get intelligence(): Characteristic {
    return this.getCharacteristicByName('Intelligence');
  }

  get willpower(): Characteristic {
    return this.getCharacteristicByName('Willpower');
  }

  get fellowship(): Characteristic {
    return this.getCharacteristicByName('Fellowship');
  }

  get wounds(): Characteristic {
    return this.getCharacteristicByName('Wounds');
  }
}
