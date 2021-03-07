import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodesAddComponent } from './qr-codes-add.component';

describe('QrCodesAddComponent', () => {
  let component: QrCodesAddComponent;
  let fixture: ComponentFixture<QrCodesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
