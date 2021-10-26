import {TestBed} from "@angular/core/testing";
import {RollService} from "./roll.service";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {Character} from "../../model/character/character.model";
import {CharacterCharacteristics} from "../../model/characteristic/character-characteristic.model";

describe('RollService', () => {

  let rollService: RollService;
  let character: SkirmishCharacter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    rollService = TestBed.inject(RollService);
    character = prepareSkirmishCharacter();
  })

  it('should be created', () => {
    expect(rollService).toBeTruthy();
  })

  it('should return true if roll is a double', () => {
    expect(rollService["checkIfRollIsDouble"](22)).toEqual(true);
  })

  it('should return false if roll is not a double', () => {
    expect(rollService["checkIfRollIsDouble"](27)).toEqual(false);
  })

  it('should return 2 success level', () => {
    character.roll = 20;
    character.modifier = 0;

    expect(RollService.calculateSuccessLevel(40, character).successLevel).toEqual(2);
  })

  it('should return true if roll was a failure', () => {
    character.roll = 40;
    character.modifier = 0;

    expect(RollService.calculateSuccessLevel(40, character).isSuccessful).toEqual(true);
  })

  it('should return false if roll was a failure', () => {
    character.roll = 46;
    character.modifier = 0;

    expect(RollService.calculateSuccessLevel(40, character).isSuccessful).toEqual(false);
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
