import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatnershipStatusComponent } from './patnership-status.component';

describe('PatnershipStatusComponent', () => {
  let component: PatnershipStatusComponent;
  let fixture: ComponentFixture<PatnershipStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatnershipStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatnershipStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
