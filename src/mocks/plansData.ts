import { PlanType, Network } from '../redux/plans/typings';

export const plansData: {
  [key in Network]: {
    id: number;
    name: string;
    planGroup: PlanType;
    subtitle: string;
    price: string;
    perks: string[];
  }[];
} = {
  MTN: [
    {
      id: 1,
      name: 'Daily Plan',
      planGroup: PlanType.Daily,
      subtitle: 'Practice unlimited for a day',
      price: '₦20',
      perks: [
        'Local exams only (WAEC, JAMB, NECO)',
        'Unlimited practice test',
        'See performance reports',
        'Personalize your practice tests',
      ],
    },
    {
      id: 2,
      name: 'Weekly Plan',
      planGroup: PlanType.Weekly,
      subtitle: 'Practice unlimited for a week',
      price: '₦50',
      perks: [
        'Local exams only (WAEC, JAMB, NECO)',
        'Unlimited practice test',
        'See performance reports',
        'Personalize your practice tests',
      ],
    },
    {
      id: 3,
      name: 'Monthly Plan',
      planGroup: PlanType.Monthly,
      subtitle: 'Practice unlimited for a month',
      price: '₦150',
      perks: [
        'Local exams only (WAEC, JAMB, NECO)',
        'Unlimited practice test',
        'See performance reports',
        'Personalize your practice tests',
      ],
    },
  ],
  AIRTEL: [
    {
      id: 1,
      name: 'Daily Plan',
      planGroup: PlanType.Daily,
      subtitle: 'Practice unlimited for a day',
      price: '₦20',
      perks: [
        'Local exams only (WAEC, JAMB, NECO)',
        'Unlimited practice test',
        'See performance reports',
        'Personalize your practice tests',
      ],
    },
    {
      id: 2,
      name: 'Weekly Plan',
      planGroup: PlanType.Weekly,
      subtitle: 'Practice unlimited for a week',
      price: '₦50',
      perks: [
        'Local exams only (WAEC, JAMB, NECO)',
        'Unlimited practice test',
        'See performance reports',
        'Personalize your practice tests',
      ],
    },
    {
      id: 3,
      name: 'Monthly Plan',
      planGroup: PlanType.Monthly,
      subtitle: 'Practice unlimited for a month',
      price: '₦150',
      perks: [
        'Local exams only (WAEC, JAMB, NECO)',
        'Unlimited practice test',
        'See performance reports',
        'Personalize your practice tests',
      ],
    },
  ],
  GLO: [
    {
      id: 1,
      name: 'Daily Plan',
      planGroup: PlanType.Daily,
      subtitle: 'Practice unlimited for a day',
      price: '₦20',
      perks: [
        'Local exams only (WAEC, JAMB, NECO)',
        'Unlimited practice test',
        'See performance reports',
        'Personalize your practice tests',
      ],
    },
    {
      id: 2,
      name: 'Weekly Plan',
      planGroup: PlanType.Weekly,
      subtitle: 'Practice unlimited for a week',
      price: '₦50',
      perks: [
        'Local exams only (WAEC, JAMB, NECO)',
        'Unlimited practice test',
        'See performance reports',
        'Personalize your practice tests',
      ],
    },
    {
      id: 3,
      name: 'Monthly Plan',
      planGroup: PlanType.Monthly,
      subtitle: 'Practice unlimited for a month',
      price: '₦150',
      perks: [
        'Local exams only (WAEC, JAMB, NECO)',
        'Unlimited practice test',
        'See performance reports',
        'Personalize your practice tests',
      ],
    },
  ],
  NINE_MOBILE: [
    {
      id: 1,
      name: 'Daily Plan',
      planGroup: PlanType.Daily,
      subtitle: 'Practice unlimited for a day',
      price: '₦20',
      perks: [
        'Local exams only (WAEC, JAMB, NECO)',
        'Unlimited practice test',
        'See performance reports',
        'Personalize your practice tests',
      ],
    },
    {
      id: 2,
      name: 'Weekly Plan',
      planGroup: PlanType.Weekly,
      subtitle: 'Practice unlimited for a week',
      price: '₦50',
      perks: [
        'Local exams only (WAEC, JAMB, NECO)',
        'Unlimited practice test',
        'See performance reports',
        'Personalize your practice tests',
      ],
    },
    {
      id: 3,
      name: 'Monthly Plan',
      planGroup: PlanType.Monthly,
      subtitle: 'Practice unlimited for a month',
      price: '₦150',
      perks: [
        'Local exams only (WAEC, JAMB, NECO)',
        'Unlimited practice test',
        'See performance reports',
        'Personalize your practice tests',
      ],
    },
  ],
};

export const plans = [
  {
    id: 1,
    name: 'Weekly Plan',
    planGroup: PlanType.Weekly,
    period: 'WEEK',
    subtitle: 'Practice unlimited for a week',
    price: '$8',
    priceInNGN: '₦1,500',
    amount: 8,
    amountInNGN: 1500,
    perks: [
      'International Exams',
      'Unlimited practice test',
      'See performance reports',
      'Personalize your practice tests',
    ],
  },
  {
    id: 2,
    name: 'Monthly Plan',
    planGroup: PlanType.Monthly,
    period: 'MONTH',
    subtitle: 'Practice unlimited for a month',
    price: '$24',
    priceInNGN: '₦4,500',
    amount: 24,
    amountInNGN: 4500,
    perks: [
      'International Exams',
      'Unlimited practice test',
      'See performance reports',
      'Personalize your practice tests',
    ],
    recommended: true,
  },
  {
    id: 3,
    name: 'Quarterly Plan',
    planGroup: PlanType.Quarterly,
    period: 'QUARTER',
    subtitle: 'Practice unlimited for 3 months',
    price: '$55',
    priceInNGN: '₦7000',
    amount: 55,
    amountInNGN: 7000,
    perks: [
      'International Exams',
      'Unlimited practice test',
      'See performance reports',
      'Personalize your practice tests',
    ],
  },
];
