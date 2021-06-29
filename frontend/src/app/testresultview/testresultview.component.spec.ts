import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestresultviewComponent } from './testresultview.component';

describe('TestresultviewComponent', () => {
  let component: TestresultviewComponent;
  let fixture: ComponentFixture<TestresultviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestresultviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestresultviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
