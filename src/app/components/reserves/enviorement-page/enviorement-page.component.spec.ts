import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviorementPageComponent } from './enviorement-page.component';

describe('EnviorementPageComponent', () => {
  let component: EnviorementPageComponent;
  let fixture: ComponentFixture<EnviorementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviorementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviorementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
