import {animate, animation, state, style, transition, trigger, useAnimation} from '@angular/animations';

const transAnimation = animation([
  animate('{{ time }}', style({ transform: 'translateX({{ x }})' }))
], {
  params: {
    x: 0,
    time: '1000ms'
  }
});

export const flyInOutAni = trigger('flyInOut', [
  state('in', style({ transform: 'translateX(20px)' })),
  transition(':enter', [
    style({
      transform: 'translateX(-100%)'
    }),
    useAnimation(transAnimation)
  ]),
  transition(':leave', useAnimation(transAnimation, {
    params: {
      x: '100%',
      time: '500ms'
    }
  }))
]);
