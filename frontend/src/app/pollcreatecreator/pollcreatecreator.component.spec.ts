import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollcreatecreatorComponent } from './pollcreatecreator.component';

describe('PollcreatecreatorComponent', () => {
  let component: PollcreatecreatorComponent;
  let fixture: ComponentFixture<PollcreatecreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollcreatecreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollcreatecreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
