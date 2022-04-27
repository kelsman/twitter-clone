import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueSpinnerComponent } from './blue-spinner.component';

describe('BlueSpinnerComponent', () => {
  let component: BlueSpinnerComponent;
  let fixture: ComponentFixture<BlueSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlueSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
