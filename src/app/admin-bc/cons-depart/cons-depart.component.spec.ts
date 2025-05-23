import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsDepartComponent } from './cons-depart.component';

describe('ConsDepartComponent', () => {
  let component: ConsDepartComponent;
  let fixture: ComponentFixture<ConsDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsDepartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
