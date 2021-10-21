import {fakeAsync, TestBed} from '@angular/core/testing';
import {ConditionService} from "./condition.service";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {Character} from "../../model/character/character.model";
import {CharacterCharacteristics} from "../../model/characteristic/character-characteristic.model";
import {ConditionsList} from "../../model/conditions/conditions-list.model";
import {Condition} from "../../model/conditions/condition.model";
import objectContaining = jasmine.objectContaining;

describe('ConditionService', () => {
  let conditionService: ConditionService;
  let skirmishCharacter: SkirmishCharacter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    conditionService = TestBed.inject(ConditionService);
    prepareSkirmishCharacter();

  })

  it('should be created', () => {
    expect(conditionService).toBeTruthy();
  })

  //----Ablaze condition
  it('should remove 2 wounds from ablaze ', () => {
    addAblazeCondition(2);
    skirmishCharacter.roll = 30;
    skirmishCharacter.modifier = 0;

    expect(conditionService['calculateAblazeDamage'](6, skirmishCharacter)).toEqual(2);
  });

  it('should remove 1 wound from ablaze when final damage is lower than 0', () => {
    addAblazeCondition(2);
    skirmishCharacter.roll = 30;
    skirmishCharacter.modifier = 0;

    expect(conditionService['calculateAblazeDamage'](2, skirmishCharacter)).toEqual(1);
  });

  //----Bleeding condition
  it('should remove 4 wounds from bleeding when bleeding has level 4 and character is conscious', () => {
    addBleedingCondition(4);

    conditionService['checkBleeding'](skirmishCharacter, skirmishCharacter.conditions[0]);
    expect(skirmishCharacter).toEqual(objectContaining({
      currentWounds: 11
    }))
  });

  it('should add unconscious condition after wounds drop to 0', () => {
    addBleedingCondition(4);
    skirmishCharacter.currentWounds = 3;

    let conditions = [
      new Condition(ConditionsList.bleeding, 4),
      new Condition(ConditionsList.unconscious, 1),
    ]

    conditionService['checkBleeding'](skirmishCharacter, skirmishCharacter.conditions[0]);
    expect(skirmishCharacter).toEqual(objectContaining({
      conditions: conditions
    }))
  });

  it('character should be dead after bleeding out', () => {
    addBleedingCondition(4);

    conditionService['checkBleedingOut'](skirmishCharacter.conditions[0],{roll: 20, modifier: 0} ,skirmishCharacter);
    expect(skirmishCharacter).toEqual(objectContaining({
      isDead: true
    }))
  });

  //----Broken condition
  it('should remove broken condition and add fatigue condition after roll with enough success level', () => {
    addBrokenCondition(2);
    skirmishCharacter.roll = 30;
    skirmishCharacter.modifier = 0;

    const conditions = [
      new Condition(ConditionsList.fatigued, 1)
    ]

    conditionService['calculateBrokenLevel'](skirmishCharacter, skirmishCharacter.conditions[0]);
    expect(skirmishCharacter).toEqual(objectContaining({
      conditions: conditions
    }));
  });

  it('shouldn"t remove broken condition and add fatigue condition after roll with not enough success level', () => {
    addBrokenCondition(2);
    skirmishCharacter.roll = 40;
    skirmishCharacter.modifier = 0;

    const conditions = [
      new Condition(ConditionsList.broken, 1)
    ]

    conditionService['calculateBrokenLevel'](skirmishCharacter, skirmishCharacter.conditions[0]);
    expect(skirmishCharacter).toEqual(objectContaining({
      conditions: conditions
    }));
  });

  it('shouldn"t remove broken condition after failure roll',() => {
    addBrokenCondition(2);
    skirmishCharacter.roll = 50;
    skirmishCharacter.modifier = 0;

    const conditions = [
      new Condition(ConditionsList.broken, 2)
    ]

    conditionService['calculateBrokenLevel'](skirmishCharacter, skirmishCharacter.conditions[0]);
    expect(skirmishCharacter).toEqual(objectContaining({
      conditions: conditions
    }));
  });

  function prepareSkirmishCharacter() {
    skirmishCharacter = new SkirmishCharacter(
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
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.broken, 2)
    ]
  }

  function addAblazeCondition(level: number) {
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.ablaze, level)
    ]
  }

  function addBleedingCondition(level: number) {
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.bleeding, level)
    ]
  }

  function addBrokenCondition(level: number) {
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.broken, level)
    ]
  }
})
