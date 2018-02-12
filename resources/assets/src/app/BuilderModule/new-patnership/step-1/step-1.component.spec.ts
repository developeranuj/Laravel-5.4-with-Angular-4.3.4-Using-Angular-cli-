import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1Component } from './step-1.component';

describe('Step1Component', () => {
  let component: Step1Component;
  let fixture: ComponentFixture<Step1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
