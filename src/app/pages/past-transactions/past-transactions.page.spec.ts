import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PastTransactionsPage } from './past-transactions.page';

describe('PastTransactionsPage', () => {
  let component: PastTransactionsPage;
  let fixture: ComponentFixture<PastTransactionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTransactionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
