import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollviewComponent } from './pollview.component';

describe('PollviewComponent', () => {
  let component: PollviewComponent;
  let fixture: ComponentFixture<PollviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
