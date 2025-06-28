import { API_TAGS, TagCombination } from './enhancedApi';

// Cache invalidation patterns for different actions
export const CACHE_INVALIDATION_PATTERNS = {
  // User actions
  USER_LOGIN: [
    API_TAGS.USER,
    API_TAGS.PROFILE,
    API_TAGS.PREFERENCE,
    API_TAGS.STATISTICS,
  ] as TagCombination,
  USER_LOGOUT: Object.values(API_TAGS) as TagCombination, // Invalidate everything on logout
  USER_PROFILE_UPDATE: [API_TAGS.USER, API_TAGS.PROFILE] as TagCombination,
  USER_PREFERENCE_UPDATE: [
    API_TAGS.USER,
    API_TAGS.PREFERENCE,
  ] as TagCombination,

  // Course actions
  COURSE_ENROLL: [
    API_TAGS.COURSE,
    API_TAGS.ENROLLMENT,
    API_TAGS.STUDENT,
  ] as TagCombination,
  COURSE_COMPLETE: [
    API_TAGS.COURSE,
    API_TAGS.ENROLLMENT,
    API_TAGS.STUDENT,
    API_TAGS.STATISTICS,
  ] as TagCombination,
  COURSE_PROGRESS_UPDATE: [
    API_TAGS.COURSE,
    API_TAGS.ENROLLMENT,
    API_TAGS.STUDENT,
  ] as TagCombination,

  // Exam actions
  EXAM_START: [API_TAGS.EXAM, API_TAGS.STUDENT] as TagCombination,
  EXAM_SUBMIT: [
    API_TAGS.EXAM,
    API_TAGS.STUDENT_PAPER,
    API_TAGS.STATISTICS,
    API_TAGS.ANALYTICS,
  ] as TagCombination,
  EXAM_RESULT_VIEW: [API_TAGS.EXAM, API_TAGS.STUDENT_PAPER] as TagCombination,

  // Practice actions
  PRACTICE_START: [
    API_TAGS.PRACTICE,
    API_TAGS.STUDENT_PRACTICE,
  ] as TagCombination,
  PRACTICE_ANSWER_SUBMIT: [
    API_TAGS.PRACTICE,
    API_TAGS.QUESTION,
    API_TAGS.STUDENT_PRACTICE,
    API_TAGS.STATISTICS,
  ] as TagCombination,
  PRACTICE_COMPLETE: [
    API_TAGS.PRACTICE,
    API_TAGS.STUDENT_PRACTICE,
    API_TAGS.STATISTICS,
    API_TAGS.ANALYTICS,
  ] as TagCombination,

  // Question actions
  QUESTION_CREATE: [
    API_TAGS.CREATE_EARN,
    API_TAGS.QUESTION,
    API_TAGS.STATISTICS,
  ] as TagCombination,
  QUESTION_UPDATE: [API_TAGS.CREATE_EARN, API_TAGS.QUESTION] as TagCombination,
  QUESTION_DELETE: [API_TAGS.CREATE_EARN, API_TAGS.QUESTION] as TagCombination,
  QUESTION_FLAG: [API_TAGS.QUESTION_FLAG, API_TAGS.QUESTION] as TagCombination,

  // Content actions
  SUBJECT_UPDATE: [
    API_TAGS.SUBJECT,
    API_TAGS.TOPIC,
    API_TAGS.CONTENT,
  ] as TagCombination,
  TOPIC_UPDATE: [
    API_TAGS.SUBJECT,
    API_TAGS.TOPIC,
    API_TAGS.CONTENT,
  ] as TagCombination,
  CONTENT_UPDATE: [
    API_TAGS.CONTENT,
    API_TAGS.SUBJECT,
    API_TAGS.TOPIC,
  ] as TagCombination,

  // Statistics actions
  STATISTICS_UPDATE: [
    API_TAGS.STATISTICS,
    API_TAGS.ANALYTICS,
  ] as TagCombination,
  ANALYTICS_REFRESH: [
    API_TAGS.ANALYTICS,
    API_TAGS.STATISTICS,
  ] as TagCombination,

  // Student actions
  STUDENT_PAPER_SUBMIT: [
    API_TAGS.STUDENT,
    API_TAGS.STUDENT_PAPER,
    API_TAGS.STATISTICS,
    API_TAGS.ANALYTICS,
  ] as TagCombination,
  STUDENT_PRACTICE_SUBMIT: [
    API_TAGS.STUDENT,
    API_TAGS.STUDENT_PRACTICE,
    API_TAGS.STATISTICS,
  ] as TagCombination,

  // Notification actions
  NOTIFICATION_CREATE: [API_TAGS.NOTIFICATION] as TagCombination,
  NOTIFICATION_READ: [API_TAGS.NOTIFICATION] as TagCombination,
  NOTIFICATION_DELETE: [API_TAGS.NOTIFICATION] as TagCombination,
} as const;

// Helper function to get invalidation tags for an action
export const getInvalidationTags = (
  action: keyof typeof CACHE_INVALIDATION_PATTERNS
): TagCombination => {
  return CACHE_INVALIDATION_PATTERNS[action] || [];
};

// Helper function to combine multiple invalidation patterns
export const combineInvalidationTags = (
  ...actions: (keyof typeof CACHE_INVALIDATION_PATTERNS)[]
): TagCombination => {
  const allTags = actions.flatMap(
    (action) => CACHE_INVALIDATION_PATTERNS[action] || []
  );
  return [...new Set(allTags)]; // Remove duplicates
};

// Helper function to get tags for a specific resource
export const getResourceTags = (resourceType: string): TagCombination => {
  const resourceTagMap: Record<string, TagCombination> = {
    user: [API_TAGS.USER, API_TAGS.PROFILE],
    profile: [API_TAGS.USER, API_TAGS.PROFILE],
    preference: [API_TAGS.USER, API_TAGS.PREFERENCE],
    course: [API_TAGS.COURSE, API_TAGS.ENROLLMENT],
    enrollment: [API_TAGS.COURSE, API_TAGS.ENROLLMENT, API_TAGS.STUDENT],
    exam: [API_TAGS.EXAM, API_TAGS.PAPER],
    paper: [API_TAGS.EXAM, API_TAGS.PAPER, API_TAGS.STUDENT_PAPER],
    practice: [API_TAGS.PRACTICE, API_TAGS.QUESTION, API_TAGS.STUDENT_PRACTICE],
    question: [API_TAGS.QUESTION, API_TAGS.CREATE_EARN],
    student: [
      API_TAGS.STUDENT,
      API_TAGS.STUDENT_PAPER,
      API_TAGS.STUDENT_PRACTICE,
    ],
    student_paper: [API_TAGS.STUDENT, API_TAGS.STUDENT_PAPER],
    student_practice: [API_TAGS.STUDENT, API_TAGS.STUDENT_PRACTICE],
    subject: [API_TAGS.SUBJECT, API_TAGS.TOPIC],
    topic: [API_TAGS.SUBJECT, API_TAGS.TOPIC, API_TAGS.CONTENT],
    content: [API_TAGS.CONTENT, API_TAGS.SUBJECT, API_TAGS.TOPIC],
    statistics: [API_TAGS.STATISTICS, API_TAGS.ANALYTICS],
    analytics: [API_TAGS.ANALYTICS, API_TAGS.STATISTICS],
    notification: [API_TAGS.NOTIFICATION],
  };

  return resourceTagMap[resourceType] || [];
};

// Helper function to create custom tag combinations
export const createTagCombination = (
  ...tags: (keyof typeof API_TAGS)[]
): TagCombination => {
  return tags.map((tag) => API_TAGS[tag]);
};

// Helper function to get all tags for a module
export const getModuleTags = (module: string): TagCombination => {
  const moduleTagMap: Record<string, TagCombination> = {
    auth: [API_TAGS.AUTH, API_TAGS.USER, API_TAGS.SESSION],
    user: [API_TAGS.USER, API_TAGS.PROFILE, API_TAGS.PREFERENCE],
    course: [API_TAGS.COURSE, API_TAGS.ENROLLMENT, API_TAGS.LESSON],
    exam: [API_TAGS.EXAM, API_TAGS.PAPER, API_TAGS.QUESTION],
    practice: [API_TAGS.PRACTICE, API_TAGS.QUESTION, API_TAGS.STUDENT_PRACTICE],
    student: [
      API_TAGS.STUDENT,
      API_TAGS.STUDENT_PAPER,
      API_TAGS.STUDENT_PRACTICE,
    ],
    content: [API_TAGS.SUBJECT, API_TAGS.TOPIC, API_TAGS.CONTENT],
    statistics: [API_TAGS.STATISTICS, API_TAGS.ANALYTICS],
    create_earn: [API_TAGS.CREATE_EARN, API_TAGS.QUESTION_FLAG],
    notification: [API_TAGS.NOTIFICATION],
  };

  return moduleTagMap[module] || [];
};

// Helper function to invalidate all tags for a module
export const getModuleInvalidationTags = (module: string): TagCombination => {
  return getModuleTags(module);
};

// Helper function to create a custom invalidation pattern
export const createCustomInvalidationPattern = (
  provides: TagCombination,
  invalidates: TagCombination
) => ({
  provides,
  invalidates,
});

// Export all utilities
export const cacheUtils = {
  getInvalidationTags,
  combineInvalidationTags,
  getResourceTags,
  createTagCombination,
  getModuleTags,
  getModuleInvalidationTags,
  createCustomInvalidationPattern,
  patterns: CACHE_INVALIDATION_PATTERNS,
};
