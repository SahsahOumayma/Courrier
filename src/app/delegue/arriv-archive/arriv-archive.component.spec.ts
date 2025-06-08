import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivArchiveComponent } from './arriv-archive.component';

describe('ArrivArchiveComponent', () => {
  let component: ArrivArchiveComponent;
  let fixture: ComponentFixture<ArrivArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrivArchiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrivArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
