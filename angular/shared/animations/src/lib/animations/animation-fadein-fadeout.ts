import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
} from '@angular/animations';

export const FadeInFadeOut = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [style({ position: 'absolute', width: '100%' })], {
      optional: true,
    }),
    group([
      query(':leave', [animate('300ms ease-out', style({ opacity: 0 }))], {
        optional: true,
      }),
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('300ms ease-in', style({ opacity: 1 })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
