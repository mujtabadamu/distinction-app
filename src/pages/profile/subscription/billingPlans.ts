export const PLAN_FEATURES = {
  BASIC_PLAN: [
    { text: 'Universal access to leaderboard' },
    { text: 'Premium quizathon entry for ₦2,000' },
    { text: 'Certificate generation for ₦5,000' },
    { text: 'Unlimited flashcard generation for ₦200/day' },
    { text: 'Unlimited key point generation for ₦200/day' },
    { text: 'Unlimited study pal prompts for ₦200/day' },
  ],
  STANDARD_PLAN: [
    { text: 'Premium access to monthly quizathon' },
    { text: 'Universal access to leaderboard' },
    { text: 'Certificate generation for ₦2,000' },
    { text: 'Unlimited flashcard generation for ₦200/day' },
    { text: 'Unlimited key point generation for ₦200/day' },
    { text: 'Unlimited study pal prompts for ₦200/day' },
    // { text: 'Ads removal' },
  ],
  PREMIUM_PLAN: [
    { text: 'Unlimited generation of flashcards' },
    { text: 'Unlimited generation of key points' },
    { text: 'Unlimited use of practice questions' },
    { text: 'Unlimited use of study pal' },
    { text: 'Premium access to monthly quizathon event' },
    { text: 'Universal access to leaderboard' },
    { text: 'Free certificate generation' },
    // { text: 'Ads removal' },
    // { text: 'Save 20% on annual payment' },
  ],
};

export const UNDISCOUNTED_PRICES: Record<string, Record<string, number>> = {
  STANDARD_PLAN: {
    MONTHLY: 1500,
    YEARLY: 15000,
  },
  PREMIUM_PLAN: {
    MONTHLY: 3000,
    YEARLY: 30000,
  },
};
