import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvcArriveeArchivComponent } from './svc-arrivee-archiv.component';

describe('SvcArriveeArchivComponent', () => {
  let component: SvcArriveeArchivComponent;
  let fixture: ComponentFixture<SvcArriveeArchivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvcArriveeArchivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvcArriveeArchivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
