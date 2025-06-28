export const ANIMATE_ONCE = true;
export const TOP_RIGHT = 'top-right';
export const SUCCESS = 'success';
export const ERROR = 'error';
export const WARNING = 'warning';
export const DEFAULT_ERROR_MESSAGE =
  'An error occured. Please reload the page to try again.';
export const EMPTY_VALUE = '--/--';
export const PAYSTACK_PB_KEY =
  process.env.REACT_APP_PAYSTACK_PUBLIC_KEY ||
  'pk_test_4a73fbece7a2de99ee0bbc71a54bf15840d6fb4d';
export const STRIPE_PB_KEY =
  process.env.REACT_APP_STRIPE_PUBLIC_KEY ||
  'pk_test_51MsIqYHiNbcpy2Q0KVqQ4Tnf6Cje7MxIkcqUrvKKUO3BB9EHj0EswkkAfHt7JYB7BdRko4kxTCMGEnPR9Lib1mUU008FTwrWom';

export const PLATFORM = 'SCHOOLS_DISTINCTION_APP';

export const statusCodes = {
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
};

export const EDITOR_API_KEY =
  'kxxvj2ulbrz1343adk393qzj7wh0fak7e1zlebcgcxefh2kj';

export const DEFAULT_OPTION = [
  {
    id: crypto.randomUUID(),
    text: '',
    correct: false,
  },
];

export const questionTypes = [
  { label: 'Single Choice', value: 'SINGLE_CHOICE' },
  { label: 'Multiple Choice', value: 'MULTIPLE_CHOICE' },
];

export type DifficultyType = 'EASY' | 'MEDIUM' | 'HARD';
export const DifficultyModes: DifficultyType[] = ['EASY', 'MEDIUM', 'HARD'];
export type PlatformType =
  | 'DISTINCTION_NG'
  | 'DISTINCTION_APP'
  | 'SCHOOLS_DISTINCTION_APP';

export const recaptchaConfig = {
  RECAPTCHA_SITE_KEY:
    (process.env.REACT_APP_ENV ?? process.env.NODE_ENV ?? 'development') ===
    'production'
      ? import.meta.env.VITE_RECAPTCHA_SITE_KEY_PROD
      : (process.env.REACT_APP_ENV ?? process.env.NODE_ENV ?? 'development') ===
          'staging' ||
        (process.env.REACT_APP_ENV ?? process.env.NODE_ENV ?? 'development') ===
          'stage'
      ? import.meta.env.VITE_RECAPTCHA_SITE_KEY_STAGE
      : import.meta.env.VITE_RECAPTCHA_SITE_KEY_DEV,
};

export const DISTINCTION_RESOURCE_BASE_URL = `https://resource.distinction.app`;
export const GENERIC_VIDEO_PLAYBACK_ERROR_MESSAGE =
  'Sorry, unable to play this video';

export enum DistinctionFeatureProperty {
  FLASHCARD = 'FLASHCARD',
  KEYPOINTS = 'KEYPOINTS',
  PRACTICE_QUESTIONS = 'PRACTICE_QUESTIONS',
  MONTHLY_QUIZATON = 'MONTHLY_QUIZATON',
  LEADERBOARD = 'LEADERBOARD',
  QUIZATON_CERTIFICATE = 'QUIZATON_CERTIFICATE',
  STUDY_PAL = 'STUDY_PAL',
}

export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export enum Duration {
  Short = 400,
  Mid = 800,
  Long = 1600,
}

export const curriculums = [
  {
    value: 'NUC' as const,
    label: 'NUC',
    description: 'For Universities',
  },
  {
    value: 'NBTE' as const,
    label: 'NBTE',
    description: 'For Polytechnics',
  },
  {
    value: 'NCCE' as const,
    label: 'NCCE',
    description: 'For Colleges of Education',
  },
];

export const LEVEL_OPTIONS = {
  NUC: [
    { label: '100 Level', value: '100 Level' },
    { label: '200 Level', value: '200 Level' },
    { label: '300 Level', value: '300 Level' },
    { label: '400 Level', value: '400 Level' },
    { label: '500 Level', value: '500 Level' },
    { label: '600 Level', value: '600 Level' },
  ],
  NBTE: [
    { label: 'ND 1', value: 'ND 1' },
    { label: 'ND 2', value: 'ND 2' },
    { label: 'HND 1', value: 'HND 1' },
    { label: 'HND 2', value: 'HND 2' },
  ],
  NCCE: [
    { label: 'NCE 1', value: 'NCE 1' },
    { label: 'NCE 2', value: 'NCE 2' },
    { label: 'NCE 3', value: 'NCE 3' },
  ],
  DEFAULT: [],
};

export function getLevelOptionsByCurriculum(
  curriculum: string
): { label: string; value: string }[] {
  if (!curriculum) return LEVEL_OPTIONS.DEFAULT;
  return (
    LEVEL_OPTIONS[curriculum as keyof typeof LEVEL_OPTIONS] ||
    LEVEL_OPTIONS.DEFAULT
  );
}
