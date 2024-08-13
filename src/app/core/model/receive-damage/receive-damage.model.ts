export class ReceivedDamage {
  public characterId: number
  public damage!: number
  public bodyLocalization!: string
  public isWeaponUndamaging!: boolean
  public isLosingTest!: boolean
  public shield!: number
  public isSuddenDeath!: boolean
  public destroyArmorValue!: number
  public isIgnoringArmor!: boolean


  constructor(characterId: number, isWeaponUndamaging: boolean, isLosingTest: boolean, isSuddenDeath: boolean, destroyArmorValue: number, isIgnoringArmor: boolean) {
    this.characterId = characterId
    this.isWeaponUndamaging = isWeaponUndamaging
    this.isLosingTest = isLosingTest
    this.isSuddenDeath = isSuddenDeath
    this.destroyArmorValue = destroyArmorValue
    this.isIgnoringArmor = isIgnoringArmor
  }
}
