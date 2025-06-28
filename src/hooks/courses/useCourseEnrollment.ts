import { useAppDispatch } from 'redux/store';

import { parseErrorMessage } from 'utils/errorHandlers';
import { errorNotifier, successNotifier } from 'utils/helpers';
import {
  enrolledCourseApi,
  EnrolledCourseStatus,
} from 'pages/courses/enrolledCourseApi';
import { EnrolledCourseView } from 'generated/index';

// -----Messages-----
const ENROLLED_MESSAGE = 'Course enrolled successfully';

// -----Hook-----
export const useCoursesEnrollment = () => {
  const dispatch = useAppDispatch();

  const enrolledCoursesQuery = enrolledCourseApi.useGetEnrolledCoursesQuery({
    size: 50,
  });

  const enrolledCourses = enrolledCoursesQuery.data?.items ?? [];
  const isCoursesLoading = enrolledCoursesQuery.isLoading;
  const coursesError = enrolledCoursesQuery.error;

  const [createEnrollment, { isLoading: isEnrolling, error: enrollmentError }] =
    enrolledCourseApi.useCreateEnrolledCourseMutation();

  // NOTE: Will eventually change this to API call
  const getCourseEnrollmentStatus = (
    courseId: string
  ): EnrolledCourseStatus | undefined => {
    const enrolledCourse = enrolledCourses.find(
      (course) => course.courseId === courseId
    );

    return enrolledCourse?.status;
  };

  const enrollCourse = async (courseId: string) => {
    try {
      const requestBody = {
        courseId,
        status: 'NOT_STARTED' as EnrolledCourseStatus,
      };
      const result = await createEnrollment({ requestBody }).unwrap();
      successNotifier(ENROLLED_MESSAGE);
      dispatch(
        enrolledCourseApi.util.updateQueryData(
          'getEnrolledCourses',
          {},
          (draft) => {
            if (draft?.items) {
              draft.items.push(result as EnrolledCourseView);
            }
          }
        )
      );

      return result;
    } catch (error) {
      errorNotifier(parseErrorMessage(error));
    }
  };

  return {
    getCourseEnrollmentStatus,
    enrollCourse,
    isCoursesLoading,
    isEnrolling,
    coursesError,
    enrollmentError,
    enrolledCourses,
  };
};
