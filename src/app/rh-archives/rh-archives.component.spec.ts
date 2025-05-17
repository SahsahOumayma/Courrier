import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhArchivesComponent } from './rh-archives.component';

describe('RhArchivesComponent', () => {
  let component: RhArchivesComponent;
  let fixture: ComponentFixture<RhArchivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RhArchivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RhArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
