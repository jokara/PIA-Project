import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestviewsolvedComponent } from './testviewsolved.component';

describe('TestviewsolvedComponent', () => {
  let component: TestviewsolvedComponent;
  let fixture: ComponentFixture<TestviewsolvedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestviewsolvedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestviewsolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
