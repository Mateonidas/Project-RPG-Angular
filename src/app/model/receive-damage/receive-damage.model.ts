export class ReceivedDamage {
  public characterId: number;
  public damage!: number;
  public bodyLocalization!: string;
  public isWeaponUndamaging!: boolean;
  public isLosingTest!: boolean;
  public shield!: number;

  constructor(characterId: number) {
    this.characterId = characterId;
  }
}
