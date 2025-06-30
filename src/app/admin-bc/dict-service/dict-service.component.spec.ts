import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictServiceComponent } from './dict-service.component';

describe('DictServiceComponent', () => {
  let component: DictServiceComponent;
  let fixture: ComponentFixture<DictServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
