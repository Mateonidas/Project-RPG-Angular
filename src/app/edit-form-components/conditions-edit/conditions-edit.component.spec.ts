import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsEditComponent } from './conditions-edit.component';

describe('ConditionsEditComponent', () => {
  let component: ConditionsEditComponent;
  let fixture: ComponentFixture<ConditionsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
