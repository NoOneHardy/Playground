import {state, style} from "@angular/animations";

export const mainGallery = state('mainGallery', style({
  'height': '100vh',
  'width': '100vw',
  'bottom': '0',
  'right': '0',
  'z-index': '1',
}))

export const previousGallery = state('previousGallery', style({
  'height': '100vh',
  'width': '100vw',
  'z-index': '0',
  'bottom': '0',
  'right': '0'
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
  'right': '90vh',
  'z-index': '4',
  'box-shadow': '0 0 20px #000'
}))

export const nextGallery = state('nextGallery', style({
  ...nextGalleriesStyle,
  'right': '5vh',
  'z-index': '4'
}))

export const nextGallery2 = state('nextGallery2', style({
  ...nextGalleriesStyle,
  'right': '2vh',
  'z-index': '3'
}))

export const nextGallery3 = state('nextGallery3', style({
  ...nextGalleriesStyle,
  'right': '-1vh',
  'z-index': '2'
}))

export const nextGallery4 = state('nextGallery4', style({
  ...nextGalleriesStyle,
  'right': '-4vh',
  'z-index': '1'
}))
