import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvcProfilComponent } from './svc-profil.component';

describe('SvcProfilComponent', () => {
  let component: SvcProfilComponent;
  let fixture: ComponentFixture<SvcProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvcProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvcProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
