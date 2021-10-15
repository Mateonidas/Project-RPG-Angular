import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttackReportService {

  public attackerName!: string;
  public attackerAttackTrait!: string;
  public attackerRoll!: string;
  public attackerModifier!: string;
  public attackerSuccessLevel!: string;

  public targetName!: string;
  public targetDefenceTrait!: string;
  public targetRoll!: string;
  public targetModifier!: string;
  public targetSuccessLevel!: string;

  public result!: string;
  public damage!: string;
}
