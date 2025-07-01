import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictQuestComponent } from './dict-quest.component';

describe('DictQuestComponent', () => {
  let component: DictQuestComponent;
  let fixture: ComponentFixture<DictQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictQuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
