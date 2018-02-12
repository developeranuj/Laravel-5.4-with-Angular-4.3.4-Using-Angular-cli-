import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnershipsettingComponent } from './partnershipsetting.component';

describe('PartnershipsettingComponent', () => {
  let component: PartnershipsettingComponent;
  let fixture: ComponentFixture<PartnershipsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnershipsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnershipsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
