import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhUtilisateursComponent } from './rh-utilisateurs.component';

describe('RhUtilisateursComponent', () => {
  let component: RhUtilisateursComponent;
  let fixture: ComponentFixture<RhUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RhUtilisateursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RhUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
