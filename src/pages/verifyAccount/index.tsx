import { useState } from 'react';
import { Box, Text, Spacer } from '@flexisaf/flexibull2';
import VerifyProfile from './components/VerifyProfile';
import MatriculationScreen from './components/MatriculationScreen';
import Success from './components/Success';
import { VerifyContainer, Logo, Footer } from './styles';
import useValidateStudent from './hooks/useValidateStudent';
import { Link } from 'react-router-dom';
const VerifyAccount = () => {
  const [steps, setSteps] = useState(1);
  const [activeEmail, setActiveEmail] = useState('');
  const {
    getValidateStudent,
    studentValidated,
    loadingValidateStudent,
    error,
    isRegisteringUser,
    RegisterBulkUploadedUser,
  } = useValidateStudent();
  return (
    <VerifyContainer>
      <Link to="/">
        <Logo />
      </Link>
      {steps === 1 && (
        <MatriculationScreen
          getValidateStudent={getValidateStudent}
          studentValidated={studentValidated}
          steps={steps}
          setSteps={setSteps}
          error={error}
          loadingValidateStudent={loadingValidateStudent}
        />
      )}
      {steps === 2 && (
        <VerifyProfile
          isRegisteringUser={isRegisteringUser}
          RegisterBulkUploadedUser={RegisterBulkUploadedUser}
          setActiveEmail={setActiveEmail}
          studentValidated={studentValidated}
          steps={steps}
          setSteps={setSteps}
        />
      )}
      {steps === 3 && <Success activeEmail={activeEmail} />}
      <Box>
        {steps === 1 && (
          <Box className="container-exam">
            <Text bold block className="easy-title" size="1.9rem">
              Exams made easy
            </Text>
            <Spacer space="10" />
            <Text block className="easy-description">
              Practice questions tailored to your institution and A’s all your
              test and exams
            </Text>
          </Box>
        )}
        <Footer>
          <Text bold size="0.8rem">
            © 2024 FlexiSAF Edusoft Limited.
          </Text>
          <Text size="0.8rem">
            By continuing you agree to the{' '}
            <a href="" target="_blank" className="footer-service">
              Terms of Service{' '}
            </a>
            and{' '}
            <a href="" target="_blank" className="footer-service">
              Privacy Policy.
            </a>
          </Text>
        </Footer>
      </Box>
    </VerifyContainer>
  );
};

export default VerifyAccount;
