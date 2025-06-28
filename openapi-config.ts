import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'https://api.saflearn.flexisafapps-dev.com/api-docs',
  apiFile: './src/store/emptyApi.ts',
  apiImport: 'baseApi',
  outputFile: './src/store/result.ts',
  exportName: 'coreApi',
  hooks: true,
  //   outputFiles: {
  //     './src/store/api/auth.ts': {
  //       exportName: 'authApi',
  //       filterEndpoints: (endpoint) => {
  //         // Filter by endpoint names that are likely to be stable
  //         const authPatterns = [
  //           'login',
  //           'register',
  //           'refreshToken',
  //           'passwordReset',
  //           'passwordResetRequest',
  //           'tokenLogin',
  //           'verify',
  //           'validate',
  //           'google',
  //           'authorize',
  //         ];
  //         return authPatterns.some((pattern) => endpoint.includes(pattern));
  //       },
  //     },
  //     './src/store/api/student.ts': {
  //       exportName: 'studentApi',
  //       filterEndpoints: (endpoint) => {
  //         // Filter by endpoint names that are likely to be stable
  //         const studentPatterns = [
  //           'student',
  //           'profile',
  //           'streak',
  //           'referral',
  //           'practice',
  //           'paper',
  //           'result',
  //           'bookmark',
  //           'answer',
  //           'timer',
  //         ];
  //         return studentPatterns.some((pattern) => endpoint.includes(pattern));
  //       },
  //     },
  //     './src/store/api/quizathon.ts': {
  //       exportName: 'quizathonApi',
  //       filterEndpoints: (endpoint) => {
  //         const quizathonPatterns = [
  //           'quizathon',
  //           'participant',
  //           'leaderboard',
  //           'certificate',
  //           'ranking',
  //           'accuracy',
  //           'daily',
  //         ];
  //         return quizathonPatterns.some((pattern) => endpoint.includes(pattern));
  //       },
  //     },
  //     './src/store/api/content.ts': {
  //       exportName: 'contentApi',
  //       filterEndpoints: (endpoint) => {
  //         const contentPatterns = [
  //           'paper',
  //           'question',
  //           'subject',
  //           'section',
  //           'exam',
  //           'course',
  //           'lesson',
  //           'keypoint',
  //           'flashcard',
  //           'enrolled',
  //         ];
  //         return contentPatterns.some((pattern) => endpoint.includes(pattern));
  //       },
  //     },
  //     './src/store/api/flashcards.ts': {
  //       exportName: 'flashcardsApi',
  //       filterEndpoints: (endpoint) => {
  //         const flashcardPatterns = ['flashcard', 'session'];
  //         return flashcardPatterns.some((pattern) => endpoint.includes(pattern));
  //       },
  //     },
  //     './src/store/api/subscription.ts': {
  //       exportName: 'subscriptionApi',
  //       filterEndpoints: (endpoint) => {
  //         const subscriptionPatterns = [
  //           'subscription',
  //           'plan',
  //           'payment',
  //           'webhook',
  //           'transaction',
  //         ];
  //         return subscriptionPatterns.some((pattern) =>
  //           endpoint.includes(pattern)
  //         );
  //       },
  //     },
  //     './src/store/api/rewards.ts': {
  //       exportName: 'rewardsApi',
  //       filterEndpoints: (endpoint) => {
  //         const rewardPatterns = ['reward', 'airtime', 'cash'];
  //         return rewardPatterns.some((pattern) => endpoint.includes(pattern));
  //       },
  //     },
  //     './src/store/api/admin.ts': {
  //       exportName: 'adminApi',
  //       filterEndpoints: (endpoint) => {
  //         const adminPatterns = [
  //           'admin',
  //           'staff',
  //           'school',
  //           'institution',
  //           'faculty',
  //           'department',
  //           'token',
  //           'email',
  //           'migration',
  //         ];
  //         return adminPatterns.some((pattern) => endpoint.includes(pattern));
  //       },
  //     },
  //     './src/store/api/chatbot.ts': {
  //       exportName: 'chatbotApi',
  //       filterEndpoints: (endpoint) => {
  //         const chatbotPatterns = ['chatbot', 'assistant', 'thread', 'session'];
  //         return chatbotPatterns.some((pattern) => endpoint.includes(pattern));
  //       },
  //     },
  //     './src/store/api/media.ts': {
  //       exportName: 'mediaApi',
  //       filterEndpoints: (endpoint) => {
  //         const mediaPatterns = ['image', 'file', 'folder', 'multimedia'];
  //         return mediaPatterns.some((pattern) => endpoint.includes(pattern));
  //       },
  //     },
  //     './src/store/api/analytics.ts': {
  //       exportName: 'analyticsApi',
  //       filterEndpoints: (endpoint) => {
  //         const analyticsPatterns = [
  //           'statistics',
  //           'analytics',
  //           'dashboard',
  //           'metrics',
  //           'breakdown',
  //         ];
  //         return analyticsPatterns.some((pattern) => endpoint.includes(pattern));
  //       },
  //     },
  //     './src/store/api/telco.ts': {
  //       exportName: 'telcoApi',
  //       filterEndpoints: (endpoint) => {
  //         const telcoPatterns = ['telco', 'callback'];
  //         return telcoPatterns.some((pattern) => endpoint.includes(pattern));
  //       },
  //     },
  //     './src/store/api/solutions.ts': {
  //       exportName: 'solutionsApi',
  //       filterEndpoints: (endpoint) => {
  //         const solutionPatterns = ['solution', 'answer'];
  //         return solutionPatterns.some((pattern) => endpoint.includes(pattern));
  //       },
  //     },
  //     './src/store/api/flags.ts': {
  //       exportName: 'flagsApi',
  //       filterEndpoints: (endpoint) => {
  //         const flagPatterns = ['flag'];
  //         return flagPatterns.some((pattern) => endpoint.includes(pattern));
  //       },
  //     },
  //   },
};

export default config;
