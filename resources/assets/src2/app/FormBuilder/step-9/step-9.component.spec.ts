import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step9Component } from './step-9.component';

describe('Step9Component', () => {
  let component: Step9Component;
  let fixture: ComponentFixture<Step9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
