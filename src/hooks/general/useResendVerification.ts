
import { useState } from 'react';
import { Notify } from '@flexisaf/flexibull2';
import { DistinctionAuthService } from 'generated/index';
import { apiWrapper } from 'utils/http-client';
import { handleError } from 'utils/errorHandlers';
import { DistinctionResendVerification } from 'generated/index';

const useResendVerification = () => {
  const [isResending, setIsResending] = useState<boolean>(false);

  const resendVerificationEmail = async (
    payload: DistinctionResendVerification,
    callback?: () => void
  ) => {
    setIsResending(true);
    try {
      await apiWrapper(() =>
        DistinctionAuthService.resendVerification({ requestBody: payload })
      );
      if (callback) callback();
      Notify('Email has been sent to your inbox', {
        status: 'success',
      });
      setIsResending(false);
    } catch (error) {
      setIsResending(false);
      handleError(error);
    }
  };

  return {
    resendVerificationEmail,
    isResending,
  };
};
  export default useResendVerification;