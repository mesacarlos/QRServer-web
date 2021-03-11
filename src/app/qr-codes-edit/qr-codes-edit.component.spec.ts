import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodesEditComponent } from './qr-codes-edit.component';

describe('QrCodesEditComponent', () => {
  let component: QrCodesEditComponent;
  let fixture: ComponentFixture<QrCodesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
