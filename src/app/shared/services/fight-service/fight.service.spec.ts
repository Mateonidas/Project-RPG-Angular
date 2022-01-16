import { TestBed } from '@angular/core/testing';

import { FightService } from './fight.service';
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {Character} from "../../../model/character/character.model";
import {CharacterCharacteristics} from "../../../model/characteristic/character-characteristic.model";
import {SkillsList} from "../../../model/skill/skill.model";
import {Talent} from "../../../model/talent/talent.model";
import {WeaponsList} from "../../../model/weapon/weapon.model";
import {ArmorsList} from "../../../model/armor/armor.model";
import objectContaining = jasmine.objectContaining;
import {CharacterSkill} from "../../../model/skill/character-skill.model";

describe('FightService', () => {
  let service: FightService;
  let skirmishCharacters: SkirmishCharacter[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FightService);
    skirmishCharacters = prepareTestSkirmishCharacters();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test', () => {
    skirmishCharacters[0].roll.value = 35;
    skirmishCharacters[0].roll.modifier = 0;
    skirmishCharacters[0].isAttacker = true;
    skirmishCharacters[0].isDodging = false;
    skirmishCharacters[0].usedWeapon = skirmishCharacters[0].weapons[0];

    skirmishCharacters[1].roll.value = 65;
    skirmishCharacters[1].roll.modifier = 0;
    skirmishCharacters[1].isDodging = true;
    skirmishCharacters[1].isAttacker = false;
    skirmishCharacters[1].isFlanked = false;

    service.fightCalculation(skirmishCharacters[0], skirmishCharacters[1]);

    expect(skirmishCharacters[0]).toEqual(objectContaining({
      advantage: 1
    }));

    expect(skirmishCharacters[1]).toEqual(objectContaining({
      currentWounds: 7
    }));
  })

  function prepareTestSkirmishCharacters() {
    return [
      new SkirmishCharacter(
        new Character(
          'Markus',
          'Mieszkaniec Ubersreiku.',

          new CharacterCharacteristics(
            4, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 15
          ),
          [
            new CharacterSkill(SkillsList.meleeFencing, 50)
          ],
          [
            new Talent('Ambidextrous', 'Oburęczność', 1, '2')
          ],
          true,
          [
            WeaponsList.rapier
          ],
          [
            ArmorsList.leatherJack,
            ArmorsList.leatherLeggings,
          ]
        ),
        0
      ),
      new SkirmishCharacter(
        new Character(
          'Zygfryd',
          'Mieszkaniec Altdorfu.',

          new CharacterCharacteristics(
            4, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 15
          ),
          [
            new CharacterSkill(SkillsList.meleeBasic, 50)
          ],
          [
            new Talent('Ambidextrous', 'Oburęczność', 1, '2')
          ],
          true,
          [
            WeaponsList.handWeapon,
            WeaponsList.crossbow
          ],
          [
            ArmorsList.leatherJack,
            ArmorsList.leatherLeggings,
          ]
        ),
        1
      )
    ]
  }
});
