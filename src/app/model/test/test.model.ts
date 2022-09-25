import {SkirmishCharacter} from "../skirmish/skirmish-character.model";
import {Skill} from "../skill/skill.model";
import {Model} from "../model";

export class Test {
  public skirmishCharacter: SkirmishCharacter;
  public skillType: Skill;
  public conditionType: Model;
  public modifier: number;
  public result: number;

  constructor(skirmishCharacter?: SkirmishCharacter, skillType?: Skill, conditionType?: Model, modifier?: number, result?: number) {
    this.skirmishCharacter = <SkirmishCharacter>skirmishCharacter;
    this.skillType = <Skill>skillType;
    this.conditionType = <Model>conditionType;
    this.modifier = <number>modifier;
    this.result = <number>result;
  }
}
