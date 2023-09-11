import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibeCardsComponent } from './exibe-cards.component';

describe('ExibeCardsComponent', () => {
  let component: ExibeCardsComponent;
  let fixture: ComponentFixture<ExibeCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExibeCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExibeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
