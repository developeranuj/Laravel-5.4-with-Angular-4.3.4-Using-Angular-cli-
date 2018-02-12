import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step14Component } from './step-14.component';

describe('Step14Component', () => {
  let component: Step14Component;
  let fixture: ComponentFixture<Step14Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step14Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
