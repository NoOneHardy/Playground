import {Component, Input, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Gallery} from "../shared/interfaces/gallery";

@Component({
  selector: 'n1h-main-gallery',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './main-gallery.component.html',
  styleUrl: './main-gallery.component.css'
})
export class MainGalleryComponent implements OnInit {
  @Input() gallery?: Gallery

  path = ''

  ngOnInit() {
    if (this.gallery) {
      this.path = `assets/img/${this.gallery.folder}/${this.gallery.preview}.jpeg`
    }
  }
}
