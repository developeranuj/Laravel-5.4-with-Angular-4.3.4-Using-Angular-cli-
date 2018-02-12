import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePatnershipComponent } from './update-patnership.component';

describe('UpdatePatnershipComponent', () => {
  let component: UpdatePatnershipComponent;
  let fixture: ComponentFixture<UpdatePatnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePatnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePatnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
