import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiServicesComponent } from './si-services.component';

describe('SiServicesComponent', () => {
  let component: SiServicesComponent;
  let fixture: ComponentFixture<SiServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
