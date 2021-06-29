import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolldeletecreatorComponent } from './polldeletecreator.component';

describe('PolldeletecreatorComponent', () => {
  let component: PolldeletecreatorComponent;
  let fixture: ComponentFixture<PolldeletecreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolldeletecreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolldeletecreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
