import {SkirmishCharacter} from "../skirmish/skirmish-character.model";
import {Skill} from "../skill/skill.model";
import {Condition} from "../condition/condition.model";

export class Test {
  public skirmishCharacter: SkirmishCharacter;
  public skillType: Skill;
  public conditionType: Condition;
  public modifier: number;
  public result: number;
  public isFeasible: boolean;

  constructor(skirmishCharacter?: SkirmishCharacter, skillType?: Skill, conditionType?: Condition, modifier?: number, result?: number, isFeasible?: boolean) {
    this.skirmishCharacter = <SkirmishCharacter>skirmishCharacter;
    this.skillType = <Skill>skillType;
    this.conditionType = <Condition>conditionType;
    this.modifier = <number>modifier;
    this.result = <number>result;
    this.isFeasible = <boolean>isFeasible;
  }
}
