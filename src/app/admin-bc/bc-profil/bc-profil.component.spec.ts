import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcProfilComponent } from './bc-profil.component';

describe('BcProfilComponent', () => {
  let component: BcProfilComponent;
  let fixture: ComponentFixture<BcProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BcProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BcProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
