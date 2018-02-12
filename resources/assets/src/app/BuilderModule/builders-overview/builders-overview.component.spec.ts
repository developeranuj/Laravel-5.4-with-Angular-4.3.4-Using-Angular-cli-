import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildersOverviewComponent } from './builders-overview.component';

describe('BuildersOverviewComponent', () => {
  let component: BuildersOverviewComponent;
  let fixture: ComponentFixture<BuildersOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildersOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
