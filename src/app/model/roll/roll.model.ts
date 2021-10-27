export class Roll {
  private _value: number = 0;
  private _modifier: number = 0;
  private _successLevel: number = 0;
  private _isSuccessful: boolean = false;
  private _isDouble: boolean = false;

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

  get isDouble(): boolean {
    return this._isDouble;
  }

  set isDouble(value: boolean) {
    this._isDouble = value;
  }


  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get modifier(): number {
    return this._modifier;
  }

  set modifier(value: number) {
    this._modifier = value;
  }
}
