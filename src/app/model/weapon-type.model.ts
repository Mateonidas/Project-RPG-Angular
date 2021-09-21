import {ListModel} from "./list-model";
import {Skill, SkillsList} from "./skill.model";
import {Model} from "./model";

export class WeaponGroup extends Model {
    public usedSkill: Skill;

    constructor(name: string, nameTranslation: string, usedSkill: Skill) {
        super(name, nameTranslation);
        this.usedSkill = usedSkill;
    }
}

export class WeaponGroupsList extends ListModel {
    public static list = [
        new WeaponGroup('Basic', 'Podstawowa', SkillsList.meleeBasic),
        new WeaponGroup('Crossbow', 'Kusze', SkillsList.rangedCrossbow),
    ]

    static get basic(): WeaponGroup {
        return <WeaponGroup>this.getListElementByName('Basic');
    }

    static get crossbow(): WeaponGroup {
        return <WeaponGroup>this.getListElementByName('Crossbow');
    }
}
