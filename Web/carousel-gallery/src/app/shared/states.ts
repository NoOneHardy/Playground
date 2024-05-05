import {state, style} from "@angular/animations";

export const gallery1 = state('gallery1', style({
  'top': '50%',
  'left': '-350px',
  'transform': 'scale(0.5) translateY(calc(-50% - 25% / .5))'
}))

export const gallery2 = state('gallery2', style({
  'top': '50%',
  'left': '0',
  'transform': 'scale(.75) translateY(calc(-50% - 12.5% / .75))'
}))

export const gallery3 = state('gallery3', style({
  'top': '50%',
  'left': '50%',
  'transform': 'scale(1) translateX(-50%) translateY(-50%)'
}))

export const gallery4 = state('gallery4', style({
  'top': '50%',
  'left': '100%',
  'transform': 'scale(.75) translateX(calc(-100% / 0.75)) translateY(calc(-50% - 12.5% / .75))'
}))

export const gallery5 = state('gallery5', style({
  'top': '50%',
  'left': '100%',
  'transform': 'scale(0.5) translateY(calc(-50% - 25% / .75))'
}))
