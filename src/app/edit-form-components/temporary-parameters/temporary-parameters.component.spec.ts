import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryParametersComponent } from './temporary-parameters.component';

describe('TemporaryParametersComponent', () => {
  let component: TemporaryParametersComponent;
  let fixture: ComponentFixture<TemporaryParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporaryParametersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemporaryParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
