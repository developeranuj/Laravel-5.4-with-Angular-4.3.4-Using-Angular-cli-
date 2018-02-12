import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbuilderComponent } from './newbuilder.component';

describe('NewbuilderComponent', () => {
  let component: NewbuilderComponent;
  let fixture: ComponentFixture<NewbuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
