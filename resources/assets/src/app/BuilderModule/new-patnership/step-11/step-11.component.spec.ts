import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step11Component } from './step-11.component';

describe('Step11Component', () => {
  let component: Step11Component;
  let fixture: ComponentFixture<Step11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
