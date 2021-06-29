import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollresultviewComponent } from './pollresultview.component';

describe('PollresultviewComponent', () => {
  let component: PollresultviewComponent;
  let fixture: ComponentFixture<PollresultviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollresultviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollresultviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
