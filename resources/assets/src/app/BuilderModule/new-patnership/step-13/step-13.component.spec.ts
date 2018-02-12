import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step13Component } from './step-13.component';

describe('Step13Component', () => {
  let component: Step13Component;
  let fixture: ComponentFixture<Step13Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step13Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
