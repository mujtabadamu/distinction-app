import { DistinctionAuthService } from 'generated/index';
import { useState } from 'react';

const useAuth = () => {
  const [isValidatingEmail, setIsValidatingEmail] = useState<boolean>(false);
  const validateEmail = async (email: string) => {
    setIsValidatingEmail(true);
    try {
      const response = await DistinctionAuthService.validateStudentEmail({
        email,
      });
      setIsValidatingEmail(false);
      return response;
    } catch (error) {
      setIsValidatingEmail(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  return {
    validateEmail,
    isValidatingEmail,
  };
};

export default useAuth;
