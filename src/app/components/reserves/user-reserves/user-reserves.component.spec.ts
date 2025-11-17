import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservesComponent } from './user-reserves.component';

describe('UserReservesComponent', () => {
  let component: UserReservesComponent;
  let fixture: ComponentFixture<UserReservesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReservesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReservesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
