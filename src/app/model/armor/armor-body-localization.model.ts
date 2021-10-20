export class ArmorBodyLocalization {

  private _headArmor = 0;
  private _leftArmArmor = 0;
  private _rightArmArmor = 0;
  private _bodyArmor = 0;
  private _leftLegArmor = 0;
  private _rightLegArmor = 0;


  get headArmor(): number {
    return this._headArmor;
  }

  set headArmor(value: number) {
    this._headArmor = value;
  }

  get leftArmArmor(): number {
    return this._leftArmArmor;
  }

  set leftArmArmor(value: number) {
    this._leftArmArmor = value;
  }

  get rightArmArmor(): number {
    return this._rightArmArmor;
  }

  set rightArmArmor(value: number) {
    this._rightArmArmor = value;
  }

  get bodyArmor(): number {
    return this._bodyArmor;
  }

  set bodyArmor(value: number) {
    this._bodyArmor = value;
  }

  get leftLegArmor(): number {
    return this._leftLegArmor;
  }

  set leftLegArmor(value: number) {
    this._leftLegArmor = value;
  }

  get rightLegArmor(): number {
    return this._rightLegArmor;
  }

  set rightLegArmor(value: number) {
    this._rightLegArmor = value;
  }
}
