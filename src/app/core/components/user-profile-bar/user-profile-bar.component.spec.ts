import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileBarComponent } from './user-profile-bar.component';

describe('UserProfileBarComponent', () => {
  let component: UserProfileBarComponent;
  let fixture: ComponentFixture<UserProfileBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileBarComponent]
    });
    fixture = TestBed.createComponent(UserProfileBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
