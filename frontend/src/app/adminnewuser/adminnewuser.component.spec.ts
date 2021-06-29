import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminnewuserComponent } from './adminnewuser.component';

describe('AdminnewuserComponent', () => {
  let component: AdminnewuserComponent;
  let fixture: ComponentFixture<AdminnewuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminnewuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminnewuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
