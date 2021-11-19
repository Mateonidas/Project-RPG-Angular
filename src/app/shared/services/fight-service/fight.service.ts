import { Injectable } from '@angular/core';
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ServiceModel} from "../service.model";
import {BodyLocalizationList} from "../../../model/body-localization/body-localization.model";
import {InjuresList} from "../../../model/injures/injures-list.model";
import {RoundService} from "../round-service/round.service";

@Injectable({
  providedIn: 'root'
})
export class FightService extends ServiceModel{

  constructor(modalService: NgbModal,
              private roundService: RoundService) {
    super(modalService);
  }

  checkDouble(owner: SkirmishCharacter, opponent: SkirmishCharacter) {
    if(this.checkIfCharacterUseFightSkill(owner)) {
      if(owner.roll.isDouble) {
        if(owner.roll.isSuccessful) {
          this.createRollDialog(owner.name + ': Trafienie krytyczne (k100)', false)
            .subscribe((rollResult: { roll: number, modifier: number }) => {
              this.checkCriticalHit(opponent, rollResult);
            })
          console.log('Fuks dla ' + owner.name);
        }
        else if(!owner.roll.isSuccessful) {
          this.createRollDialog(owner.name + ': Pech (k100)', false)
            .subscribe((rollResult: { roll: number, modifier: number }) => {
              this.checkCriticalFailure(owner, rollResult.roll);
            })
          console.log('Pech dla ' + owner.name);
        }
      }
    }
  }

  checkIfCharacterUseFightSkill(character: SkirmishCharacter) {
    return character.usedWeapon != undefined;
  }

  private checkCriticalHit(opponent: SkirmishCharacter, rollResult: {roll: number; modifier: number}) {
    this.getAttackLocalization(opponent.roll.value);
  }

  public getAttackLocalization(attackerRoll: number) {
    let localizationNumber: number = Number(attackerRoll.toLocaleString()[1] + attackerRoll.toLocaleString()[0]);

    for(let localization of BodyLocalizationList.list) {
      // @ts-ignore
      if(localizationNumber >= localization.numericalInterval[0] && localizationNumber <= localization.numericalInterval[1]) {
        return localization;
      }
    }

    return null;
  }

  private checkCriticalFailure(owner: SkirmishCharacter, roll: number) {
    if(roll >= 1 && roll <= 20) {
      owner.currentWounds -= 1;
    }
    else if(roll >= 21 && roll <= 40) {
      let roundNumber = this.roundService.roundNumber + 1;
      owner.usedWeapon.damage -= 1;
      owner.addNote('Rundę ' + roundNumber + ' zaczyna jako ostatni.' )
    }
    else if(roll >= 41 && roll <= 60) {
      owner.roll.modifier = -10;
    }
    else if(roll >= 61 && roll <= 70) {
      let roundNumber = this.roundService.roundNumber + 1;
      owner.addNote('W rundzie ' + roundNumber + ' nie wykonuje ruchu.' )
    }
    else if(roll >= 71 && roll <= 80) {
      let roundNumber = this.roundService.roundNumber + 1;
      owner.addNote('W rundzie ' + roundNumber + ' nie wykonuje akcji.' )
    }
    else if(roll >= 81 && roll <= 90) {
      this.createRollDialog(owner.name + ': Skręcenie kostki: 1-50 - lewa noga, 51-100 - prawa noga (k100)', false)
        .subscribe((rollResult: { roll: number, modifier: number }) => {
          if(rollResult.roll <= 50) {
            owner.bodyLocalizations.leftLeg.addInjure(InjuresList.minorTornMuscles);
          }
          else {
            owner.bodyLocalizations.rightLeg.addInjure(InjuresList.minorTornMuscles);
          }
        })
    }
    else if(roll >= 91 && roll <= 100) {
      //TODO: Atakuje sojusznika lub otrzymuje oszołomienie
    }
  }

}
