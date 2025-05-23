import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiUserActivationComponent } from './si-user-activation.component';

describe('SiUserActivationComponent', () => {
  let component: SiUserActivationComponent;
  let fixture: ComponentFixture<SiUserActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiUserActivationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiUserActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
