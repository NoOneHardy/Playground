import {state, style} from "@angular/animations";

export const mainGallery = state('mainGallery', style({
  'height': '100vh',
  'width': '100vw'
}))

export const previousGallery = state('previousGallery', style({
  'height': '100vh',
  'width': '100vw',
  'z-index': '1'
}))

const nextGalleriesStyle = {
  'width': '23vh',
  'height': '40vh',
  'overflow': 'hidden',
  'border-radius': '10px',
  'bottom': '10vh',
  'box-shadow': '0 0 15px #000',
}

export const focusedGallery = state('focusedGallery', style({
  ...nextGalleriesStyle,
  'bottom': '50vh',
  'right': '50vw',
  'transform': 'translate(50%, 50%)'
}))

export const nextGallery = state('nextGallery', style({
  ...nextGalleriesStyle,
  'right': '5vh',
}))

export const nextGallery2 = state('nextGallery2', style({
  ...nextGalleriesStyle,
  'right': '2vh',
}))

export const nextGallery3 = state('nextGallery3', style({
  ...nextGalleriesStyle,
  'right': '-1vh',
}))
