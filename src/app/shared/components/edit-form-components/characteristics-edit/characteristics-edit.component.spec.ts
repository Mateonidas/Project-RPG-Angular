import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicsEditComponent } from './characteristics-edit.component';

describe('CharacteristicsEditComponent', () => {
  let component: CharacteristicsEditComponent;
  let fixture: ComponentFixture<CharacteristicsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacteristicsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacteristicsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
