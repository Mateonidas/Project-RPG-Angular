import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuryEditComponent } from './injury-edit.component';

describe('InjuryEditComponent', () => {
  let component: InjuryEditComponent;
  let fixture: ComponentFixture<InjuryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InjuryEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InjuryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
