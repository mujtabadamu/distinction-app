import { useState } from 'react';
import { DistinctionAuthService } from 'generated/index';
import { apiWrapper } from 'utils/http-client';
import { UploadedStudentView } from 'generated/index';
import { handleError } from 'utils/errorHandlers';
import {
  DistinctionUploadedUserRegistrationRequest,
  DistinctionUploadedUserRegistrationResponse,
} from 'generated/index';

const useValidateStudent = () => {
  const [loadingValidateStudent, setLoadingValidateStudent] =
    useState<boolean>(false);
  const [isRegisteringUser, setIsRegisteringUser] = useState<boolean>(false);
  const [studentValidated, setStudentValidated] =
    useState<UploadedStudentView | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getValidateStudent = async (
    matriculationNumber: string,
    cb: () => void
  ) => {
    setLoadingValidateStudent(true);
    setError(null);
    try {
      const data = await apiWrapper(() =>
        DistinctionAuthService.getStudentReferralCode({ matriculationNumber })
      );
      setStudentValidated(data);
      setLoadingValidateStudent(false);
      if (!data)
        return setError(
          'No record found, ensure you entered the Matric/Reg number correctly.'
        );
      cb();
    } catch (error) {
      setLoadingValidateStudent(false);
      handleError(error);
    }
  };

  const RegisterBulkUploadedUser = async (
    payload: DistinctionUploadedUserRegistrationRequest,
    callback: (response: DistinctionUploadedUserRegistrationResponse) => void
  ) => {
    setIsRegisteringUser(true);
    try {
      const response = await apiWrapper(() =>
        DistinctionAuthService.registerUploadedStudent({ requestBody: payload })
      );
      setIsRegisteringUser(false);
      callback(response);
    } catch (error) {
      setIsRegisteringUser(false);
      handleError(error);
    }
  };

  return {
    loadingValidateStudent,
    getValidateStudent,
    studentValidated,
    error,
    RegisterBulkUploadedUser,
    isRegisteringUser,
  };
};

export default useValidateStudent;
