export class ReceivedDamage {
  public characterId: number;
  public damage!: number;
  public bodyLocalization!: string;
  public isWeaponUndamaging!: boolean;
  public isLosingTest!: boolean;

  constructor(characterId: number) {
    this.characterId = characterId;
  }
}
