export interface EaseFeatureCard {
  icon: string;
  title: string;
  description: string;
}

export const EASE_FEATURE_CARDS_PROPS: EaseFeatureCard[] = [
  {
    icon: 'checklist',
    title: 'start new intake',
    description: 'Submit a request to begin early advisory and cloud planning.',
  },
  {
    icon: 'estimate',
    title: 'cost estimator',
    description:
      'Get quick t-shirt size estimates based on project scale and type.',
  },
  {
    icon: 'request',
    title: 'my requests',
    description: 'Track your submitted requests and view advisory outcomes.',
  },
];
