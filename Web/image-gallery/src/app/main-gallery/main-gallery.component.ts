import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Gallery} from "../shared/interfaces/gallery";
import {animate} from "@angular/animations";

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
export class MainGalleryComponent implements OnInit, OnChanges {
  @Input() gallery?: Gallery

  appear: Animation

  path = ''

  constructor() {
    this.appear = new Animation()
  }


  ngOnInit() {
    this.reloadPath()
  }

 ngOnChanges(changes: SimpleChanges) {
    if (changes['gallery']) {
      console.log(this.gallery)
      this.reloadPath()
    }
 }

 reloadPath() {
   if (this.gallery) {
     this.path = `assets/img/${this.gallery.folder}/${this.gallery.preview}.jpeg`
   }
 }
}
