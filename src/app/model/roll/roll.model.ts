export class Roll {
  public value: number = 0;
  public modifier: number = 0;
  public successLevel: number = 0;
  public isSuccessful: boolean = false;
  public isDouble: boolean = false;

  clearRoll() {
    this.value = 0;
    this.modifier = 0;
    this.successLevel = 0;
    this.isSuccessful = false;
    this.isDouble = false;
  }

  static fromJSON(object: Object): Roll {
    return Object.assign(new Roll(), object);
  }
}
