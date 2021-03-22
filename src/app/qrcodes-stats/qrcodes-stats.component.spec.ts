import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodesStatsComponent } from './qrcodes-stats.component';

describe('QrcodesStatsComponent', () => {
  let component: QrcodesStatsComponent;
  let fixture: ComponentFixture<QrcodesStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodesStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
