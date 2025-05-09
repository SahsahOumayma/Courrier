import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegueComponent } from './delegue.component';

describe('DelegueComponent', () => {
  let component: DelegueComponent;
  let fixture: ComponentFixture<DelegueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
