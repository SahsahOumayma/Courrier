import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcStatistiqueComponent } from './bc-statistique.component';

describe('BcStatistiqueComponent', () => {
  let component: BcStatistiqueComponent;
  let fixture: ComponentFixture<BcStatistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BcStatistiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BcStatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
