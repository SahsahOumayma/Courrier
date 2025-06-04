import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiRolesComponent } from './si-roles.component';

describe('SiRolesComponent', () => {
  let component: SiRolesComponent;
  let fixture: ComponentFixture<SiRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
