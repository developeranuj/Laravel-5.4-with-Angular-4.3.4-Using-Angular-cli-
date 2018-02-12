import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBuilderComponent } from './update-builder.component';

describe('UpdateBuilderComponent', () => {
  let component: UpdateBuilderComponent;
  let fixture: ComponentFixture<UpdateBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
