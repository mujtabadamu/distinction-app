import { useAppDispatch } from '../../store/store';

import { parseErrorMessage } from '../../utils/errorHandlers';
import { errorNotifier, successNotifier } from '../../utils/helpers';
import {
  useEnhancedGetCoursesQuery,
  useEnhancedEnrollCourseMutation,
} from '../../store/enhancedApi';
import { EnrolledCourseView } from 'generated/index';

// -----Messages-----
const ENROLLED_MESSAGE = 'Course enrolled successfully';

// -----Hook-----
export const useCoursesEnrollment = () => {
  const dispatch = useAppDispatch();

  const enrolledCoursesQuery = useEnhancedGetCoursesQuery({
    size: 50,
  });

  const enrolledCourses = enrolledCoursesQuery.data?.items ?? [];
  const isCoursesLoading = enrolledCoursesQuery.isLoading;
  const coursesError = enrolledCoursesQuery.error;

  const [createEnrollment, { isLoading: isEnrolling, error: enrollmentError }] =
    useEnhancedEnrollCourseMutation();

  // NOTE: Will eventually change this to API call
  const getCourseEnrollmentStatus = (courseId: string): string | undefined => {
    const enrolledCourse = enrolledCourses.find(
      (course) => course.courseId === courseId
    );

    return enrolledCourse?.status;
  };

  const enrollCourse = async (courseId: string) => {
    try {
      const requestBody = {
        courseId,
        status: 'NOT_STARTED' as string,
      };
      const result = await createEnrollment({ requestBody }).unwrap();
      successNotifier(ENROLLED_MESSAGE);

      // RTK Query will automatically update the cache
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
