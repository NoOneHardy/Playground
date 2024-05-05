import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'n1h-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent {
  @Input() color?: string
  @Input() name?: string
  @Input() state?: string
  @Output() next = new EventEmitter<void>()

  constructor() {
  }
}
