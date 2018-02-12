import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderDasboardComponent } from './builder-dasboard.component';

describe('BuilderDasboardComponent', () => {
  let component: BuilderDasboardComponent;
  let fixture: ComponentFixture<BuilderDasboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderDasboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
