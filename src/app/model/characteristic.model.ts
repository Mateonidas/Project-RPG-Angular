import {Model} from "./model";

export class Characteristic extends Model {

}

export class Characteristics {
  private static _characteristics = [
    new Characteristic('Movement', 'Szybkość'),
    new Characteristic('WeaponSkill', 'Walka Wręcz'),
    new Characteristic('BallisticSkill', 'Umiejętności Strzeleckie'),
    new Characteristic('Strength', 'Siła'),
    new Characteristic('Toughness', 'Wytrzymałość'),
    new Characteristic('Initiative', 'Intuicja'),
    new Characteristic('Agility', 'Zwinność'),
    new Characteristic('Dexterity', 'Zręczność'),
    new Characteristic('Intelligence', 'Inteligencja'),
    new Characteristic('Willpower', 'Siła Woli'),
    new Characteristic('Fellowship', 'Ogłada'),
    new Characteristic('Wounds', 'Żywotność'),
  ]

  private static getCharacteristicByName(name: string): Characteristic {
    return <Characteristic>this._characteristics.find(x => x.name == name);
  }

  static get characteristics(): Characteristic[] {
    return this._characteristics;
  }

  static get movement(): Characteristic {
    return this.getCharacteristicByName('Movement');
  }

  static get weaponSkill(): Characteristic {
    return this.getCharacteristicByName('WeaponSkill');
  }

  static get ballisticSkill(): Characteristic {
    return this.getCharacteristicByName('BallisticSkill');
  }

  static get strength(): Characteristic {
    return this.getCharacteristicByName('Strength');
  }

  static get toughness(): Characteristic {
    return this.getCharacteristicByName('Toughness');
  }


  static get initiative(): Characteristic {
    return this.getCharacteristicByName('Initiative');
  }

  static get agility(): Characteristic {
    return this.getCharacteristicByName('Agility');
  }

  static get dexterity(): Characteristic {
    return this.getCharacteristicByName('Dexterity');
  }

  static get intelligence(): Characteristic {
    return this.getCharacteristicByName('Intelligence');
  }

  static get willpower(): Characteristic {
    return this.getCharacteristicByName('Willpower');
  }

  static get fellowship(): Characteristic {
    return this.getCharacteristicByName('Fellowship');
  }

  static get wounds(): Characteristic {
    return this.getCharacteristicByName('Wounds');
  }
}

