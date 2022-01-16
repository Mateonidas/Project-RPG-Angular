import {Skill} from "./skill.model";

export class CharacterSkill {
    public base: Skill;
    public value: number;

    constructor(skill?: Skill, value?: number) {
        this.base = <Skill>skill;
        this.value = <number>value;
    }

    static fromJSON(object: Object): CharacterSkill {
        let characterSkill = Object.assign(new CharacterSkill(), object);
        characterSkill.base = Skill.fromJSON(characterSkill['base']);
        return characterSkill;
    }

    static arrayFromJSON(objectsArray: Object[]): CharacterSkill[] {
        let characterSkills = [];
        for (let object of objectsArray) {
            let characterSkill = CharacterSkill.fromJSON(object);
            characterSkills.push(characterSkill);
        }
        return characterSkills;
    }
}
