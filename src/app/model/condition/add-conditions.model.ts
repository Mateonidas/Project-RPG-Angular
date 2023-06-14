import {CharacterCondition} from "./character-condition.model";

export class AddConditions {
  public conditions: CharacterCondition[]
  public charactersIds: number[]

  constructor(conditions: CharacterCondition[], charactersIds: number[]) {
    this.conditions = conditions;
    this.charactersIds = charactersIds;
  }
}
