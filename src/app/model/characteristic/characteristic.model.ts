import {Model} from "../model";

export class Characteristic extends Model {
  static fromJSON(object: Object): Characteristic {
    return Object.assign(new Characteristic(), object);
  }
}

export class Characteristics {
  private static _characteristics = [
    new Characteristic('MOVEMENT', 'Szybkość'),
    new Characteristic('WEAPON_SKILL', 'Walka Wręcz'),
    new Characteristic('BALLISTIC_SKILL', 'Umiejętności Strzeleckie'),
    new Characteristic('STRENGTH', 'Siła'),
    new Characteristic('TOUGHNESS', 'Wytrzymałość'),
    new Characteristic('INITIATIVE', 'Intuicja'),
    new Characteristic('AGILITY', 'Zwinność'),
    new Characteristic('DEXTERITY', 'Zręczność'),
    new Characteristic('INTELLIGENCE', 'Inteligencja'),
    new Characteristic('WILLPOWER', 'Siła Woli'),
    new Characteristic('FELLOWSHIP', 'Ogłada'),
    new Characteristic('WOUNDS', 'Żywotność'),
  ]

  public static getCharacteristicByName(name: string): Characteristic {
    return <Characteristic>this._characteristics.find(x => x.name == name);
  }

  static get characteristics(): Characteristic[] {
    return this._characteristics;
  }

  static get movement(): Characteristic {
    return this.getCharacteristicByName('MOVEMENT');
  }

  static get weaponSkill(): Characteristic {
    return this.getCharacteristicByName('WEAPON_SKILL');
  }

  static get ballisticSkill(): Characteristic {
    return this.getCharacteristicByName('BALLISTIC_SKILL');
  }

  static get strength(): Characteristic {
    return this.getCharacteristicByName('STRENGTH');
  }

  static get toughness(): Characteristic {
    return this.getCharacteristicByName('TOUGHNESS');
  }


  static get initiative(): Characteristic {
    return this.getCharacteristicByName('INITIATIVE');
  }

  static get agility(): Characteristic {
    return this.getCharacteristicByName('AGILITY');
  }

  static get dexterity(): Characteristic {
    return this.getCharacteristicByName('DEXTERITY');
  }

  static get intelligence(): Characteristic {
    return this.getCharacteristicByName('INTELLIGENCE');
  }

  static get willpower(): Characteristic {
    return this.getCharacteristicByName('WILLPOWER');
  }

  static get fellowship(): Characteristic {
    return this.getCharacteristicByName('FELLOWSHIP');
  }

  static get wounds(): Characteristic {
    return this.getCharacteristicByName('WOUNDS');
  }
}

