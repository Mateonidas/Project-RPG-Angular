import {TestBed} from "@angular/core/testing";
import {RollService} from "./roll.service";
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {Character} from "../../../model/character/character.model";
import {CharacterCharacteristics} from "../../../model/characteristic/character-characteristic.model";

describe('RollService', () => {

  let character: SkirmishCharacter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    character = prepareSkirmishCharacter();
  })

  it('should return true if roll is a double', () => {
    expect(RollService["checkIfRollIsDouble"](22)).toEqual(true);
  })

  it('should return false if roll is not a double', () => {
    expect(RollService["checkIfRollIsDouble"](27)).toEqual(false);
  })

  it('should return 2 success level', () => {
    character.roll.value = 20;
    character.roll.modifier = 0;

    RollService.calculateRollResult(40, character);

    expect(character.roll.successLevel).toEqual(2);
  })

  it('should return true if roll was a failure', () => {
    character.roll.value = 40;
    character.roll.modifier = 0;

    RollService.calculateRollResult(40, character);

    expect(character.roll.isSuccessful).toEqual(true);
  })

  it('should return false if roll was a failure', () => {
    character.roll.value = 46;
    character.roll.modifier = 0;

    RollService.calculateRollResult(40, character);

    expect(character.roll.isSuccessful).toEqual(false);
  })

  //----Prepare test data
  function prepareSkirmishCharacter() {
    return  new SkirmishCharacter(
      new Character(
        'Markus',
        'Mieszkaniec Ubersreiku.',

        new CharacterCharacteristics(
          4, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 15
        ),
        [],
        [],
        true,
        [],
        []
      )
    );
  }
})
