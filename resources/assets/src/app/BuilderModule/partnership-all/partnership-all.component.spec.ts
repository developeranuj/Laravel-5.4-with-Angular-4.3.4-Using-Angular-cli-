import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnershipAllComponent } from './partnership-all.component';

describe('PartnershipAllComponent', () => {
  let component: PartnershipAllComponent;
  let fixture: ComponentFixture<PartnershipAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnershipAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnershipAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
