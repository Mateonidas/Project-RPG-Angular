export class Roll {
  public value: number = 0;
  public modifier: number = 0;
  public successLevel: number = 0;
  public isSuccessful: boolean = false;
  public isDouble: boolean = false;

  static fromJSON(object: Object): Roll {
    return Object.assign(new Roll(), object);
  }
}
