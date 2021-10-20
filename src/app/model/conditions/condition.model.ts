import {Model} from "../model";

export class Condition {
  private _base: Model;
  private _value: number;

  constructor(model: Model, value: number) {
    this._base = model
    this._value = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get base(): Model {
    return this._base;
  }

  set base(value: Model) {
    this._base = value;
  }
}
