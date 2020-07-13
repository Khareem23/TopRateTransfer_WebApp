import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AustracComponent } from './austrac.component';

describe('AustracComponent', () => {
  let component: AustracComponent;
  let fixture: ComponentFixture<AustracComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AustracComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AustracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
