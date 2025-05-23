import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSiComponent } from './admin-si.component';

describe('AdminSiComponent', () => {
  let component: AdminSiComponent;
  let fixture: ComponentFixture<AdminSiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
