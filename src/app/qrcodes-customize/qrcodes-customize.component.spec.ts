import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodesCustomizeComponent } from './qrcodes-customize.component';

describe('QrcodesCustomizeComponent', () => {
  let component: QrcodesCustomizeComponent;
  let fixture: ComponentFixture<QrcodesCustomizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodesCustomizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodesCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
