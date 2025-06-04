import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvcDepartArchivComponent } from './svc-depart-archiv.component';

describe('SvcDepartArchivComponent', () => {
  let component: SvcDepartArchivComponent;
  let fixture: ComponentFixture<SvcDepartArchivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvcDepartArchivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvcDepartArchivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
