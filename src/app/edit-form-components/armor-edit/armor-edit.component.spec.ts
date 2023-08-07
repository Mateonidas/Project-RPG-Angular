import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorEditComponent } from './armor-edit.component';

describe('ArmorEditComponent', () => {
  let component: ArmorEditComponent;
  let fixture: ComponentFixture<ArmorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmorEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
