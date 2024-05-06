import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ImageComponent} from "./image/image.component";
import {rotate} from "./shared/animations";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'n1h-root',
  animations: [
    rotate
  ],
  standalone: true,
  imports: [CommonModule, RouterOutlet, ImageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  auto: Subscription
  title = 'carousel-gallery';
  states = [
    'gallery1',
    'gallery2',
    'gallery3',
    'gallery4',
    'gallery5'
  ]

  display: Concert[] = []
  concertIndex = 0
  indexOfLeftItem = 0
  indexOfRightItem = 4

  data: Concert[] = [
    {
      name: 'Konzert 1',
      color: 'radial-gradient(#f00, #800)'
    },
    {
      name: 'Konzert 2',
      color: 'radial-gradient(#ff0, #880)'
    },
    {
      name: 'Konzert 3',
      color: 'radial-gradient(#0f0, #080)'
    },
    {
      name: 'Konzert 4',
      color: 'radial-gradient(#0ff, #088)'
    },
    {
      name: 'Konzert 5',
      color: 'radial-gradient(#00f, #008)'
    },
    {
      name: 'Konzert 6',
      color: 'radial-gradient(#f0f, #808)'
    }
  ]

  constructor() {
    this.auto = this.refreshSubscription()
    for (this.concertIndex; this.concertIndex < 5; this.concertIndex++) {
      this.display.push(this.data[this.concertIndex])
    }
  }

  refreshSubscription(): Subscription {
    return interval(5000).subscribe(() => {
      this.next()
    })
  }

  next() {
    this.checkBounds()
    this.display[this.indexOfLeftItem++] = this.data[this.concertIndex++]
    this.indexOfRightItem++

    this.states.unshift(this.states[4])
    this.states.pop()
  }

  previous() {
    this.checkBounds()
    this.display[this.indexOfRightItem--] = this.data[this.concertIndex--]
    this.indexOfLeftItem--

    this.states.push(this.states[0])
    this.states.shift()
  }

  checkBounds() {
    if (this.indexOfLeftItem == -1) this.indexOfLeftItem = this.display.length - 1
    if (this.indexOfRightItem == -1) this.indexOfRightItem = this.display.length - 1
    if (this.indexOfLeftItem == this.display.length) this.indexOfLeftItem = 0
    if (this.indexOfRightItem == this.display.length) this.indexOfRightItem = 0
    if (this.concertIndex == -1) this.concertIndex = this.data.length - 1
    if (this.concertIndex == this.data.length) this.concertIndex = 0
  }

  private timeout?: number

  onScroll(e: WheelEvent) {
    e.preventDefault()
    this.auto.unsubscribe()
    clearTimeout(this.timeout)
    if (e.deltaY > 0) {
      this.next()
    }
    if (e.deltaY < 0) {
      this.previous()
    }
    this.timeout = setTimeout(() => {
      this.auto = this.refreshSubscription()
    }, 5000)
  }
}

export interface Concert {
  name: string
  color: string
}
