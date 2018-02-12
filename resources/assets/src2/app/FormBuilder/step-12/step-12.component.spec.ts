import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step12Component } from './step-12.component';

describe('Step12Component', () => {
  let component: Step12Component;
  let fixture: ComponentFixture<Step12Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
