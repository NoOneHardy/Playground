import {Component} from '@angular/core';
import {Gallery} from "../shared/interfaces/gallery";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MainGalleryComponent} from "../main-gallery/main-gallery.component";
import {GalleryPreviewComponent} from "../gallery-preview/gallery-preview.component";

@Component({
  selector: 'n1h-gallery-slider',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    MainGalleryComponent,
    GalleryPreviewComponent,
    NgForOf
  ],
  templateUrl: './gallery-slider.component.html',
  styleUrl: './gallery-slider.component.css'
})
export class GallerySliderComponent {
  galleries: Gallery[] = [
    {
      id: 0,
      name: 'Gallery 1',
      folder: 'gallery_1',
      amount: 2,
      mobile_preview: 0,
      preview: 1
    },
    {
      id: 1,
      name: 'Gallery 2',
      folder: 'gallery_2',
      amount: 2,
      mobile_preview: 0,
      preview: 1
    },
    {
      id: 2,
      name: 'Gallery 3',
      folder: 'gallery_3',
      amount: 2,
      mobile_preview: 0,
      preview: 1
    },
    {
      id: 3,
      name: 'Gallery 4',
      folder: 'gallery_4',
      amount: 2,
      mobile_preview: 0,
      preview: 1
    }
  ]

  mainGallery?: Gallery
  nextGalleries: Gallery[] = []

  constructor() {
    this.loadFirstGallery()
  }

  loadFirstGallery() {
    this.mainGallery = this.galleries[0]
    this.nextGalleries = []
    for (let i = 0; i < 3; i++) {
      let id = i < this.galleries.length ? i : i - this.galleries.length
      this.nextGalleries.unshift(this.galleries[id])
    }
  }
}
