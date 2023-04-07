import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldReportsComponent } from './old-reports.component';

describe('OldReportsComponent', () => {
  let component: OldReportsComponent;
  let fixture: ComponentFixture<OldReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
