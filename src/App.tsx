import { Layout } from '@flexisaf/flexibull2';
import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Theme from './utils/theme';

import SectionLoader from './components/custom/sectionLoader';
import SkeletonLoader from './components/custom/skeletonLoader';

// import Terms from 'pages/terms/terms';
import PrivateDashboard from './components/routeHelpers/PrivateDashboard';
import PrivateRoute from './components/routeHelpers/PrivateRoute';
import PublicRoute from './components/routeHelpers/PublicRoute';
// const PublicProfile = lazy(() => import('./pages/profile/publicProfile'));
// const LeaderBoard = lazy(() => import('./pages/leaderboard'));
// const QuizathonWinners = lazy(
//   () => import('./pages/quizathon/quizathonWinners')
// );
// const EditProfile = lazy(() => import('./pages/profile/editProfile'));
// const PrivacyPolicy = lazy(
//   () => import('./pages/privacy-policy/PrivacyPolicy')
// );
// const TermsOfUse = lazy(() => import('./pages/terms-of-use/TermsOfUse'));
// const NewPractice = lazy(() => import('./pages/newPractice/newPractice'));
// TODO: Trace and flush out code no longer needed
// const LearnerDashboard = lazy(() => import('./pages/learnerDashboard'));
const StudentDashboard = lazy(
  () => import('./pages/learnerDashboard/studentDashboard')
);
// const MyLibraryPage = lazy(() => import('./pages/myLibrary'));
// const FlashCardCoursePage = lazy(
//   () => import('./pages/myLibrary/flashCardPages/flashCardCoursePage')
// );
// const KeyPointCoursePage = lazy(
//   () => import('./pages/myLibrary/keyPointPages/keyPointCoursePage')
// );
// const FlashCardPage = lazy(
//   () => import('./pages/myLibrary/flashCardPages/flashCardPage')
// );
// const KeyPointPage = lazy(
//   () => import('./pages/myLibrary/keyPointPages/keyPointPage')
// );
// const PracticePage = lazy(() => import('./pages/practice'));
// const ResultPage = lazy(() => import('./pages/result/result.pages'));
const CoursePracticeHistory = lazy(
  () => import('./pages/learnerDashboard/CoursePracticeHistory')
);
const PracticeResult = lazy(
  () => import('./pages/learnerDashboard/PracticeResult')
);
// const VerifyCertificate = lazy(
//   () => import('./pages/quizathon/verifyCertificate')
// );
// const ValidateAccount = lazy(() => import('./pages/verifyAccount'));
const VerifyAccount = lazy(() => import('./pages/auth/verifyAccount.pages'));
const Register = lazy(() => import('./pages/auth/register.pages'));
const Login = lazy(() => import('./pages/auth/login.pages'));
const EmailConfirm = lazy(() => import('./pages/auth/emailConfirm'));
const PasswordReset = lazy(() => import('./pages/auth/passwordReset.pages'));
const GoogleAuthVerify = lazy(
  () => import('./pages/auth/googleAuthVerify.pages')
);

// const Chatbot = lazy(() => import('./pages/chatbot/chatbot'));
// const Quizathon = lazy(() => import('./pages/quizathon/index'));
// const Resource = lazy(() => import('./pages/resource/resource'));
// const Blog = lazy(() => import('./pages/resource/components/blogs/blog'));
// const QuizathonProfile = lazy(
//   () => import('./pages/quizathon/quizathonProfile')
// );
// const Quizathons = lazy(() => import('./pages/quizathon/quizathons'));
// const Referrals = lazy(() => import('./pages/referrals'));
// const Profile = lazy(() => import('./pages/profile/Profile'));
// const PointAccumulation = lazy(() => import('./pages/points'));
// const PointsRank = lazy(() => import('./pages/points/pointsRank'));
// const CoursesOverview = lazy(
//   () => import('./pages/courses/coursesOverview/coursesOverview.pages')
// );
// const GenerateCourse = lazy(
//   () => import('./pages/courses/generate-course/generateCourse.pages')
// );

// const CourseView = lazy(
//   () => import('./pages/courses/courseView/courseView.pages')
// );

// const LessonsView = lazy(
//   () => import('./pages/lessons/lessonsView/lessonsView.pages')
// );

function App() {
  useEffect(() => {
    // Try to deregister service workers
    // Remove after sometime.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }
  }, []);
  return (
    <Layout theme={Theme}>
      <Routes>
        {/* <Route
          path="quizathon"
          element={
            <Suspense fallback={<SectionLoader />}>
              <Quizathon />
            </Suspense>
          }
        />
        <Route
          path="resource"
          element={
            <Suspense fallback={<SectionLoader />}>
              <Resource />
            </Suspense>
          }
        />
        <Route
          path="blog/:id"
          element={
            <Suspense fallback={<SectionLoader />}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path="terms"
          element={
            <Suspense fallback={<SectionLoader />}>
              <Terms />
            </Suspense>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="/terms-service"
          element={
            <Suspense fallback={<SectionLoader />}>
              <TermsOfUse />
            </Suspense>
          }
        /> */}
        <Route
          path="/verify"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PublicRoute>
                <VerifyAccount />
              </PublicRoute>
            </Suspense>
          }
        />
        {/* <Route
          path="/quizathon-winners"
          element={
            <Suspense fallback={<SectionLoader />}>
              <QuizathonWinners />
            </Suspense>
          }
        />
        <Route
          path="/validate-student"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PublicRoute>
                <ValidateAccount />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Suspense fallback={<SectionLoader />}>
              <LeaderBoard />
            </Suspense>
          }
        />
        <Route
          path="d/:username"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PublicProfile />
            </Suspense>
          }
        /> */}
        <Route
          path="/auth-token-verify"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PublicRoute>
                <GoogleAuthVerify />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PublicRoute>
                <Login />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PublicRoute>
                <Login />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/confirm"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PublicRoute>
                <EmailConfirm />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PublicRoute>
                <Register />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/reset-request"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PublicRoute>
                <PasswordReset />
              </PublicRoute>
            </Suspense>
          }
        />

        {/* <Route
          path="/certificate/verify"
          element={
            <Suspense fallback={<SectionLoader />}>
              <VerifyCertificate />
            </Suspense>
          }
        />

        <Route
          path="/new-practice"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PrivateRoute>
                <NewPractice />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/practice"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PrivateRoute>
                <PracticePage />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/result"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PrivateRoute>
                <ResultPage />
              </PrivateRoute>
            </Suspense>
          }
        /> */}

        <Route
          path="practice-result/:id"
          element={
            <Suspense fallback={<SectionLoader />}>
              <PracticeResult />
            </Suspense>
          }
        />
        {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
        <Route path="/*" element={<PrivateDashboard />}>
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <StudentDashboard />
              </Suspense>
            }
          />
          {/* <Route
            path="my-library"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <MyLibraryPage />
              </Suspense>
            }
          />
          <Route
            path="my-library/flashcard/course/:id"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <FlashCardCoursePage />
              </Suspense>
            }
          />
          <Route
            path="my-library/keypoints/course/:id"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <KeyPointCoursePage />
              </Suspense>
            }
          />
          <Route
            path="my-library/keypoints/:id"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <KeyPointPage />
              </Suspense>
            }
          />
          <Route
            path="my-library/flashcard/:id"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <FlashCardPage />
              </Suspense>
            }
          /> */}
          {/* <Route
            path="create-question"
            element={
              <Suspense fallback={<SectionLoader />}>
                <CreateQuestion />
              </Suspense>
            }
          />
          <Route
            path="create-and-earn"
            element={
              <Suspense fallback={<SectionLoader />}>
                <CreateAndEarn />
              </Suspense>
            }
          /> */}
          {/* <Route
            path="quizathon-profile/:id"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <QuizathonProfile />
              </Suspense>
            }
          />
          <Route
            path="quizathons"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <Quizathons />
              </Suspense>
            }
          /> */}
          <Route
            path="course-practice-history/:id"
            element={
              <Suspense fallback={<SectionLoader />}>
                <CoursePracticeHistory />
              </Suspense>
            }
          />
          {/* <Route
            path="profile"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="edit-profile"
            element={
              <Suspense fallback={<SectionLoader />}>
                <EditProfile />
              </Suspense>
            }
          />
          <Route
            path="chatbot"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <Chatbot />
              </Suspense>
            }
          />
          <Route
            path="chatbot/:threadId"
            element={
              <Suspense fallback={<SkeletonLoader />}>
                <Chatbot />
              </Suspense>
            }
          />
          <Route
            path="referrals"
            element={
              <Suspense fallback={<SectionLoader />}>
                <Referrals />
              </Suspense>
            }
          />
          <Route
            path="points"
            element={
              <Suspense fallback={<SectionLoader />}>
                <PointAccumulation />
              </Suspense>
            }
          />
          <Route
            path="points/rank"
            element={
              <Suspense fallback={<SectionLoader />}>
                <PointsRank />
              </Suspense>
            }
          />
          <Route
            path="courses"
            element={
              <Suspense fallback={<SectionLoader />}>
                <CoursesOverview />
              </Suspense>
            }
          />
          <Route
            path="courses/generate-course"
            element={
              <Suspense fallback={<SectionLoader />}>
                <GenerateCourse />
              </Suspense>
            }
          />
          <Route
            path="courses/:id"
            element={
              <Suspense fallback={<SectionLoader />}>
                <CourseView />
              </Suspense>
            }
          />
          <Route
            path="courses/:id/lessons"
            element={
              <Suspense fallback={<SectionLoader />}>
                <LessonsView />
              </Suspense>
            }
          /> */}
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Layout>
  );
}

export default App;
