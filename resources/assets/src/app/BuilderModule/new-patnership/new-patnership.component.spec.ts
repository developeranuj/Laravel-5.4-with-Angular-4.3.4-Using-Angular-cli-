import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatnershipComponent } from './new-patnership.component';

describe('NewPatnershipComponent', () => {
  let component: NewPatnershipComponent;
  let fixture: ComponentFixture<NewPatnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPatnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPatnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
