import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulEmployeComponent } from './consul-employe.component';

describe('ConsulEmployeComponent', () => {
  let component: ConsulEmployeComponent;
  let fixture: ComponentFixture<ConsulEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulEmployeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
