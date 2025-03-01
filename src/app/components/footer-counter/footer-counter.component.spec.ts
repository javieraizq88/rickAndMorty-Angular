import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCounterComponent } from './footer-counter.component';

describe('FooterCounterComponent', () => {
  let component: FooterCounterComponent;
  let fixture: ComponentFixture<FooterCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
