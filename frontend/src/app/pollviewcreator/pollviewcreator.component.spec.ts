import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollviewcreatorComponent } from './pollviewcreator.component';

describe('PollviewcreatorComponent', () => {
  let component: PollviewcreatorComponent;
  let fixture: ComponentFixture<PollviewcreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollviewcreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollviewcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
