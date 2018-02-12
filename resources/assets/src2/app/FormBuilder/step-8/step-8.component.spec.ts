import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step8Component } from './step-8.component';

describe('Step8Component', () => {
  let component: Step8Component;
  let fixture: ComponentFixture<Step8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
