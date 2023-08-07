import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitsEditComponent } from './traits-edit.component';

describe('TraitsEditComponent', () => {
  let component: TraitsEditComponent;
  let fixture: ComponentFixture<TraitsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraitsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
