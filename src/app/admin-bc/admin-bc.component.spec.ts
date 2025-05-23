import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBcComponent } from './admin-bc.component';

describe('AdminBcComponent', () => {
  let component: AdminBcComponent;
  let fixture: ComponentFixture<AdminBcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
