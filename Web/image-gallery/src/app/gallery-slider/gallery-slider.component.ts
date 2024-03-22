import {Component} from '@angular/core';
import {Gallery} from "../shared/interfaces/gallery";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MainGalleryComponent} from "../main-gallery/main-gallery.component";
import {GalleryPreviewComponent} from "../gallery-preview/gallery-preview.component";
import {GalleryComponent} from "../gallery/gallery.component";

@Component({
  selector: 'n1h-gallery-slider',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    MainGalleryComponent,
    GalleryPreviewComponent,
    NgForOf,
    GalleryComponent
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

  displayGalleries: Gallery[] = []
  id = 0

  constructor() {
    this.loadFirstGallery()
  }

  loadGalleries(id: number) {
    this.displayGalleries = []
    if (id >= this.galleries.length) return
    let index: number
    if (id + 1 == this.galleries.length) {
      index = 0
    } else {
      index = id + 1
    }

    for (let i = index; i <= index + 2; i++) {
      let g = i < this.galleries.length ? i : i - this.galleries.length
      this.displayGalleries.unshift(this.galleries[g])
    }
    this.displayGalleries.unshift(this.galleries[id])
    index = id - 1 < 0 ? this.galleries.length - 1 : id - 1
    this.displayGalleries.unshift(this.galleries[index])
    this.id = id
  }

  loadFirstGallery() {
    this.loadGalleries(0)
  }

  loadNextGalleries() {
    let id: number
    if (this.id + 1 == this.galleries.length) {
      id = 0
    } else {
      id = this.id + 1
    }

    this.loadGalleries(id)
  }
}
