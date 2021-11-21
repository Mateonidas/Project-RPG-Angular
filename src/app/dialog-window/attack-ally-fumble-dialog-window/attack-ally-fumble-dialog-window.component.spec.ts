import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackAllyFumbleDialogWindowComponent } from './attack-ally-fumble-dialog-window.component';

describe('AttackAllyFumbleDialogWindowComponent', () => {
  let component: AttackAllyFumbleDialogWindowComponent;
  let fixture: ComponentFixture<AttackAllyFumbleDialogWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttackAllyFumbleDialogWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttackAllyFumbleDialogWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
