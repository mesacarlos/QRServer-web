import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodesListOptionsComponent } from './qr-codes-list-options.component';

describe('QrCodesListOptionsComponent', () => {
  let component: QrCodesListOptionsComponent;
  let fixture: ComponentFixture<QrCodesListOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodesListOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodesListOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
