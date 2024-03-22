import {Component, Input, OnInit} from '@angular/core';
import {Gallery} from "../shared/interfaces/gallery";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'n1h-gallery',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  @Input() gallery?: Gallery

  path: string = ''

  ngOnInit() {
    this.reloadPath()
  }

  reloadPath() {
    if (this.gallery) {
      this.path = `assets/img/${this.gallery.folder}/${this.gallery.preview}.jpeg`
    }
  }
}
