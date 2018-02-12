import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step10Component } from './step-10.component';

describe('Step10Component', () => {
  let component: Step10Component;
  let fixture: ComponentFixture<Step10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
