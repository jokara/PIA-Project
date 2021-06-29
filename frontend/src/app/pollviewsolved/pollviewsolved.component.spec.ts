import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollviewsolvedComponent } from './pollviewsolved.component';

describe('PollviewsolvedComponent', () => {
  let component: PollviewsolvedComponent;
  let fixture: ComponentFixture<PollviewsolvedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollviewsolvedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollviewsolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
