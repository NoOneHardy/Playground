import {animate, transition, trigger} from "@angular/animations";
import {gallery1, gallery2, gallery3, gallery4, gallery5} from "./states";

export const duration_ms = 1000

export const rotate = trigger('rotate', [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  transition('gallery5 <=> gallery4', [
    animate(duration_ms)
  ]),
  transition('gallery4 <=> gallery3', [
    animate(duration_ms)
  ]),
  transition('gallery3 <=> gallery2', [
    animate(duration_ms)
  ]),
  transition('gallery2 <=> gallery1', [
    animate(duration_ms)
  ])
])
