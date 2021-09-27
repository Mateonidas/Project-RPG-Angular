import {Model} from "../model";
import {AttackCategory, AttacksCategoryList} from "../attack/attack-category.model";
import {WeaponGroup, WeaponGroupsList} from "./weapon-type.model";
import {ListModel} from "../list-model";

export class Weapon extends Model {
    public attackType: AttackCategory;
    public weaponGroup: WeaponGroup;
    public range: string;
    public damage: number;
    public isUsingStrength: boolean;
    public advantages: string[];
    public disadvantages: string[];

    constructor(name: string, nameTranslation: string, type: AttackCategory, category: WeaponGroup, range: string, damage: number, isUsingStrength: boolean, advantages: string[], disadvantages: string[]) {
        super(name, nameTranslation)
        this.attackType = type;
        this.weaponGroup = category;
        this.range = range;
        this.damage = damage;
        this.isUsingStrength = isUsingStrength;
        this.advantages = advantages;
        this.disadvantages = disadvantages;
    }
}

export class WeaponsList extends ListModel {
    public static list = [
        new Weapon('HandWeapon', 'Broń ręczna', AttacksCategoryList.meleeAttack, WeaponGroupsList.basic, 'Średnia', 4, true, [], []),
        new Weapon('Crossbow', 'Kusza', AttacksCategoryList.rangedAttack, WeaponGroupsList.crossbow, '60', 9, false, [], [])
    ]

    static get handWeapon() {
        return <Weapon>this.getListItemByName('HandWeapon');
    }

    static get crossbow() {
        return <Weapon>this.getListItemByName('Crossbow');
    }
}
