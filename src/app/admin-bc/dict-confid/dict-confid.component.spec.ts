import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictConfidComponent } from './dict-confid.component';

describe('DictConfidComponent', () => {
  let component: DictConfidComponent;
  let fixture: ComponentFixture<DictConfidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictConfidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictConfidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
