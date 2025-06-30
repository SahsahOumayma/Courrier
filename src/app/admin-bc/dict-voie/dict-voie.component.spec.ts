import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictVoieComponent } from './dict-voie.component';

describe('DictVoieComponent', () => {
  let component: DictVoieComponent;
  let fixture: ComponentFixture<DictVoieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictVoieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictVoieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
