import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sample2Page } from './sample2.page';

describe('Sample2Page', () => {
  let component: Sample2Page;
  let fixture: ComponentFixture<Sample2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Sample2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
