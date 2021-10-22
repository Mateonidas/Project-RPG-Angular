import {TestBed} from "@angular/core/testing";
import {RollService} from "./roll.service";

describe('RollService', () => {

  let rollService: RollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    rollService = TestBed.inject(RollService);
  })

  it('should be created', () => {
    expect(rollService).toBeTruthy();
  })

  it('should return true if roll is a double', () => {
    expect(rollService["checkIfRollIsDouble"](22)).toEqual(true);
  })

  it('should return false if roll is not a double', () => {
    expect(rollService["checkIfRollIsDouble"](27)).toEqual(false);
  })
})
