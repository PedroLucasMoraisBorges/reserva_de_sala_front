import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBuildingComponent } from './register-building.component';

describe('RegisterBuildingComponent', () => {
  let component: RegisterBuildingComponent;
  let fixture: ComponentFixture<RegisterBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterBuildingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
