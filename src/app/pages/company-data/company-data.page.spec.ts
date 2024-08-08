import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyDataPage } from './company-data.page';

describe('CompanyDataPage', () => {
  let component: CompanyDataPage;
  let fixture: ComponentFixture<CompanyDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
