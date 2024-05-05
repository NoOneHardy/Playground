import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySliderComponent } from './gallery-slider.component';

describe('GallerySliderComponent', () => {
  let component: GallerySliderComponent;
  let fixture: ComponentFixture<GallerySliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GallerySliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GallerySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
