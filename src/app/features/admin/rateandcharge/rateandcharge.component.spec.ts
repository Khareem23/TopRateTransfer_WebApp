import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateandchargeComponent } from './rateandcharge.component';

describe('RateandchargeComponent', () => {
  let component: RateandchargeComponent;
  let fixture: ComponentFixture<RateandchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateandchargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateandchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
