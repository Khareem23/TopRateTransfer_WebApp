import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBannerCardComponent } from './footer-banner-card.component';

describe('FooterBannerCardComponent', () => {
  let component: FooterBannerCardComponent;
  let fixture: ComponentFixture<FooterBannerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterBannerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBannerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
