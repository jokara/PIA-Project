import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcreatecreatorComponent } from './testcreatecreator.component';

describe('TestcreatecreatorComponent', () => {
  let component: TestcreatecreatorComponent;
  let fixture: ComponentFixture<TestcreatecreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcreatecreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcreatecreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
