import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankDetailsPage } from './bank-details.page';

describe('BankDetailsPage', () => {
  let component: BankDetailsPage;
  let fixture: ComponentFixture<BankDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
