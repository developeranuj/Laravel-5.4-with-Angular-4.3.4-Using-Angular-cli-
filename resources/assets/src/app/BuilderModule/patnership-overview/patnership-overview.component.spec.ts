import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatnershipOverviewComponent } from './patnership-overview.component';

describe('PatnershipOverviewComponent', () => {
  let component: PatnershipOverviewComponent;
  let fixture: ComponentFixture<PatnershipOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatnershipOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatnershipOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
