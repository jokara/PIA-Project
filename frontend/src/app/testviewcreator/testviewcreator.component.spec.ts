import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestviewcreatorComponent } from './testviewcreator.component';

describe('TestviewcreatorComponent', () => {
  let component: TestviewcreatorComponent;
  let fixture: ComponentFixture<TestviewcreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestviewcreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestviewcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
