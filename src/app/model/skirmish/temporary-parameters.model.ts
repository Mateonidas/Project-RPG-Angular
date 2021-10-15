export class TemporaryParameters {
  private _currentWounds: number;
  private _skirmishInitiative: number;

  constructor(currentWounds: number, skirmishInitiative: number) {
    this._currentWounds = currentWounds;
    this._skirmishInitiative = skirmishInitiative;
  }

  get currentWounds(): number {
    return this._currentWounds;
  }

  set currentWounds(value: number) {
    this._currentWounds = value;
  }

  get skirmishInitiative(): number {
    return this._skirmishInitiative;
  }

  set skirmishInitiative(value: number) {
    this._skirmishInitiative = value;
  }
}
