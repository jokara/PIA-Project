import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolljsonComponent } from './polljson.component';

describe('PolljsonComponent', () => {
  let component: PolljsonComponent;
  let fixture: ComponentFixture<PolljsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolljsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolljsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
