import {TestBed} from '@angular/core/testing';
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
    skirmishCharacter = prepareSkirmishCharacter();
  })

  it('should be created', () => {
    expect(conditionService).toBeTruthy();
  })

  it('should not set modifier if character has no conditions', () => {
    let opponent  = prepareSkirmishCharacter();

    conditionService['fightCheckCondition'](skirmishCharacter, opponent);
    expect(skirmishCharacter).toEqual(objectContaining({
      modifier: 0
    }));
    expect(opponent).toEqual(objectContaining({
      modifier: 0
    }));
  });

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

  it('character should not be dead after successful roll on bleeding out', () => {
    addBleedingCondition(4);

    conditionService['checkBleedingOut'](skirmishCharacter.conditions[0],{roll: 50, modifier: 0} ,skirmishCharacter);
    expect(skirmishCharacter).toEqual(objectContaining({
      isDead: false
    }))
  });

  it('should remove one level of bleeding condition after double in roll on bleeding out', () => {
    addBleedingCondition(4);

    let conditions = [
      new Condition(ConditionsList.bleeding, 3)
    ]

    conditionService['checkBleedingOut'](skirmishCharacter.conditions[0],{roll: 22, modifier: 0} ,skirmishCharacter);
    expect(skirmishCharacter).toEqual(objectContaining({
      conditions: conditions
    }))
  });

  it('should add fatigue condition if bleeding condition was removed', () => {
    addBleedingCondition(0);

    let conditions = [
      new Condition(ConditionsList.fatigued, 1)
    ];

    conditionService['clearConditionsWithZeroValue'](skirmishCharacter);
    expect(skirmishCharacter).toEqual(objectContaining({
      conditions: conditions
    }))
  });

  //----Blinded condition
  it('should set modifier if character is blinded', () => {
    let opponent  = prepareSkirmishCharacter();
    addBlindedCondition(2);

    conditionService['fightCheckCondition'](skirmishCharacter, opponent);
    expect(skirmishCharacter).toEqual(objectContaining({
      modifier: -20
    }));
    expect(opponent).toEqual(objectContaining({
      modifier: 20
    }));
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

  it('should not remove broken condition and add fatigue condition after roll with not enough success level', () => {
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

  it('should not remove broken condition after failure roll',() => {
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

  it('should set modifier if character is broken', () => {
    let opponent  = prepareSkirmishCharacter();
    addBrokenCondition(2);

    conditionService['fightCheckCondition'](skirmishCharacter, opponent);
    expect(skirmishCharacter).toEqual(objectContaining({
      modifier: -20
    }));
  });

  //----Deafened condition
  it('should set modifier if character is deafened nad flanked', () => {
    addDeafenedCondition(2);
    skirmishCharacter.isFlanked = false;

    let opponent  = prepareSkirmishCharacter();
    opponent.isAttacker = true;

    conditionService['fightCheckCondition'](skirmishCharacter, opponent);
    expect(opponent).toEqual(objectContaining({
      modifier: 20
    }));
  });


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

  function addBlindedCondition(level: number) {
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.blinded, level)
    ]
  }

  function addBrokenCondition(level: number) {
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.broken, level)
    ]
  }

  function addDeafenedCondition(level: number) {
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.deafened, level)
    ]
  }

  function addEntangledCondition(level: number) {
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.entangled, level)
    ]
  }

  function addFatiguedCondition(level: number) {
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.fatigued, level)
    ]
  }

  function addPoisonedCondition(level: number) {
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.poisoned, level)
    ]
  }

  function addProneCondition(level: number) {
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.prone, level)
    ]
  }

  function addStunnedCondition(level: number) {
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.stunned, level)
    ]
  }

  function addSurprisedCondition(level: number) {
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.surprised, level)
    ]
  }

  function addUnconsciousCondition(level: number) {
    skirmishCharacter.conditions = [
      new Condition(ConditionsList.unconscious, level)
    ]
  }
})
