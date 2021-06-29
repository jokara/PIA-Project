import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdeletecreatorComponent } from './testdeletecreator.component';

describe('TestdeletecreatorComponent', () => {
  let component: TestdeletecreatorComponent;
  let fixture: ComponentFixture<TestdeletecreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestdeletecreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestdeletecreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
