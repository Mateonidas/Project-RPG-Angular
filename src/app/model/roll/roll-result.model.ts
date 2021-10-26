export class RollResult {
  private _successLevel: number;
  private _isSuccessful: boolean;

  constructor(successLevel: number, isSuccessful: boolean) {
    this._successLevel = successLevel;
    this._isSuccessful = isSuccessful;
  }

  get successLevel(): number {
    return this._successLevel;
  }

  set successLevel(value: number) {
    this._successLevel = value;
  }

  get isSuccessful(): boolean {
    return this._isSuccessful;
  }

  set isSuccessful(value: boolean) {
    this._isSuccessful = value;
  }
}
