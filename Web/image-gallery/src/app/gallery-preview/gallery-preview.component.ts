import {Component, Input, OnInit} from '@angular/core';
import {Gallery} from "../shared/interfaces/gallery";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'n1h-gallery-preview',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './gallery-preview.component.html',
  styleUrl: './gallery-preview.component.css'
})
export class GalleryPreviewComponent {
}
