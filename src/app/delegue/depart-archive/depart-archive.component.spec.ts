import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartArchiveComponent } from './depart-archive.component';

describe('DepartArchiveComponent', () => {
  let component: DepartArchiveComponent;
  let fixture: ComponentFixture<DepartArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartArchiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
