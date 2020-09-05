import {animate, animation, AnimationTriggerMetadata, state, style, transition, trigger} from '@angular/animations';


export function flyInOutAni(): AnimationTriggerMetadata {
 return trigger('flyInOut', [
   state('in', style({ transform: 'translateX(20px)' })),
   transition(':enter', [
     style({ transform: 'translateX(-100%)' }),
     animate(1000)
   ]),
   transition(':leave', animate(500, style({ transform: 'translateX(100%)' })))
 ]);
}

/*
*  style({ transform: 'translateX(-100%)' }),
        animate(1000)
* */

export const transAnimation = animation([
  animate('{{ time }}', style({
    transform: 'translateX({{ x }})',
  }))
], {
  params: {
    x: 0,
    time: '1000ms'
  }
});
