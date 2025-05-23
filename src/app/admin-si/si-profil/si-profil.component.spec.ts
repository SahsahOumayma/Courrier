import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiProfilComponent } from './si-profil.component';

describe('SiProfilComponent', () => {
  let component: SiProfilComponent;
  let fixture: ComponentFixture<SiProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
