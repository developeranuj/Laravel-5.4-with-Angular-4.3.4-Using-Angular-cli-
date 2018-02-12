import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnershipPanelComponent } from './partnership-panel.component';

describe('PartnershipPanelComponent', () => {
  let component: PartnershipPanelComponent;
  let fixture: ComponentFixture<PartnershipPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnershipPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnershipPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
