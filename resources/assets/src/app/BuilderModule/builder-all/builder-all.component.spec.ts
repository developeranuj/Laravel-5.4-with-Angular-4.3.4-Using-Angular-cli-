import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderAllComponent } from './builder-all.component';

describe('BuilderAllComponent', () => {
  let component: BuilderAllComponent;
  let fixture: ComponentFixture<BuilderAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
