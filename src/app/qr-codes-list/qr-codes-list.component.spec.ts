import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodesListComponent } from './qr-codes-list.component';

describe('QrCodesListComponent', () => {
  let component: QrCodesListComponent;
  let fixture: ComponentFixture<QrCodesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
