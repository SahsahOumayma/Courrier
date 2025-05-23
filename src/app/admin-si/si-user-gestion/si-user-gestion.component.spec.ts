import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiUserGestionComponent } from './si-user-gestion.component';

describe('SiUserGestionComponent', () => {
  let component: SiUserGestionComponent;
  let fixture: ComponentFixture<SiUserGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiUserGestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiUserGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
