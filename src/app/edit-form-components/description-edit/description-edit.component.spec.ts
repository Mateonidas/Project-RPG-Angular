import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionEditComponent } from './description-edit.component';

describe('DescriptionEditComponent', () => {
  let component: DescriptionEditComponent;
  let fixture: ComponentFixture<DescriptionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
