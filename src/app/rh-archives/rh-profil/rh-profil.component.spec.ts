import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhProfilComponent } from './rh-profil.component';

describe('RhProfilComponent', () => {
  let component: RhProfilComponent;
  let fixture: ComponentFixture<RhProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RhProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RhProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
