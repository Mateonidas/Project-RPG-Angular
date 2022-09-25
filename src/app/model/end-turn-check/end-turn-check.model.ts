import {Test} from "../test/test.model";

export class EndTurnCheck {
  public roundNumber: number;
  public tests: Test[];

  constructor(roundNumber?: number, tests?: Test[]) {
    this.roundNumber = <number>roundNumber;
    this.tests = <Test[]>tests;
  }
}
