import {Characteristic, Characteristics} from "./characteristic.model";

export class CharacterCharacteristic {
    public characteristic: Characteristic;
    public value: number;

    constructor(characteristic: Characteristic, value: number) {
        this.characteristic = characteristic;
        this.value = value;
    }
}

export class CharacterCharacteristics {
    private _characteristics = [
        new CharacterCharacteristic(Characteristics.movement, 0),
        new CharacterCharacteristic(Characteristics.weaponSkill, 0),
        new CharacterCharacteristic(Characteristics.ballisticSkill, 0),
        new CharacterCharacteristic(Characteristics.strength, 0),
        new CharacterCharacteristic(Characteristics.toughness, 0),
        new CharacterCharacteristic(Characteristics.initiative, 0),
        new CharacterCharacteristic(Characteristics.agility, 0),
        new CharacterCharacteristic(Characteristics.dexterity, 0),
        new CharacterCharacteristic(Characteristics.intelligence, 0),
        new CharacterCharacteristic(Characteristics.willpower, 0),
        new CharacterCharacteristic(Characteristics.fellowship, 0),
        new CharacterCharacteristic(Characteristics.wounds, 0),
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

    private getCharacteristicByName(name: string): CharacterCharacteristic {
        return <CharacterCharacteristic>this._characteristics.find(x => x.characteristic.name == name);
    }

    public getCharacteristic(characteristic: Characteristic) {
      return <CharacterCharacteristic>this._characteristics.find(x => x.characteristic == characteristic);
    }

    get characteristics(): CharacterCharacteristic[] {
        return this._characteristics;
    }

    get movement(): CharacterCharacteristic {
        return this.getCharacteristicByName('Movement');
    }

    get weaponSkill(): CharacterCharacteristic {
        return this.getCharacteristicByName('WeaponSkill');
    }

    get ballisticSkill(): CharacterCharacteristic {
        return this.getCharacteristicByName('BallisticSkill');
    }

    get strength(): CharacterCharacteristic {
        return this.getCharacteristicByName('Strength');
    }

    get toughness(): CharacterCharacteristic {
        return this.getCharacteristicByName('Toughness');
    }


    get initiative(): CharacterCharacteristic {
        return this.getCharacteristicByName('Initiative');
    }

    get agility(): CharacterCharacteristic {
        return this.getCharacteristicByName('Agility');
    }

    get dexterity(): CharacterCharacteristic {
        return this.getCharacteristicByName('Dexterity');
    }

    get intelligence(): CharacterCharacteristic {
        return this.getCharacteristicByName('Intelligence');
    }

    get willpower(): CharacterCharacteristic {
        return this.getCharacteristicByName('Willpower');
    }

    get fellowship(): CharacterCharacteristic {
        return this.getCharacteristicByName('Fellowship');
    }

    get wounds(): CharacterCharacteristic {
        return this.getCharacteristicByName('Wounds');
    }
}
