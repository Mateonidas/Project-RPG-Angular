import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentsEditComponent } from './talents-edit.component';

describe('TalentsEditComponent', () => {
  let component: TalentsEditComponent;
  let fixture: ComponentFixture<TalentsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalentsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
