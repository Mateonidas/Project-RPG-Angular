import { Injectable } from '@angular/core';
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ServiceModel} from "./service.model";

@Injectable({
  providedIn: 'root'
})
export class FightService extends ServiceModel{

  constructor(modalService: NgbModal) {
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
          console.log('Pech dla ' + owner.name);
        }
      }
    }
  }

  checkIfCharacterUseFightSkill(character: SkirmishCharacter) {
    return character.usedWeapon != undefined;
  }

  private checkCriticalHit(opponent: SkirmishCharacter, rollResult: {roll: number; modifier: number}) {

  }
  // private getAttackLocalization(attackerRoll: number, target: SkirmishCharacter): number {
  //   let localizationNumber: number = +attackerRoll.toLocaleString()[1] + +attackerRoll.toLocaleString()[0];
  //
  //   if (attackerRoll >= 1 && attackerRoll <= 9) {
  //     return target.armorBodyLocalization.headArmor;
  //   } else if (attackerRoll >= 10 && attackerRoll <= 24) {
  //     return target.armorBodyLocalization.leftArmArmor;
  //   } else if (attackerRoll >= 25 && attackerRoll <= 44) {
  //     return target.armorBodyLocalization.rightArmArmor;
  //   } else if (attackerRoll >= 45 && attackerRoll <= 79) {
  //     return target.armorBodyLocalization.bodyArmor;
  //   } else if (attackerRoll >= 80 && attackerRoll <= 89) {
  //     return target.armorBodyLocalization.leftLegArmor;
  //   } else if (attackerRoll >= 90 && attackerRoll <= 100) {
  //     return target.armorBodyLocalization.rightLegArmor;
  //   } else {
  //     return 0;
  //   }
  // }

}
