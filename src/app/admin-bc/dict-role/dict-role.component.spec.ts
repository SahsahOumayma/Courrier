import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictRoleComponent } from './dict-role.component';

describe('DictRoleComponent', () => {
  let component: DictRoleComponent;
  let fixture: ComponentFixture<DictRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
