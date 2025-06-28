import { Screen } from '../styles';
import { Text, Spacer, Button } from '@flexisaf/flexibull2';
import { PrimaryButton } from 'styles/common/buttons.styles';
import useResendVerification from 'hooks/general/useResendVerification';
import { PlatformType, PLATFORM } from 'utils/constants';
import { Link } from 'react-router-dom';

interface Props {
  activeEmail: string;
}
const Success = ({ activeEmail }: Props) => {
  const { resendVerificationEmail, isResending } = useResendVerification();
  const handleResendClick = () => {
    if (activeEmail) {
      resendVerificationEmail({
        username: activeEmail,
        platform: PLATFORM as PlatformType,
      });
    }
  };

  return (
    <Screen maxWidth="430px" style={{ margin: '0 auto', textAlign: 'center' }}>
      <Text bold size="1.3rem">
        Check Your email
      </Text>
      <Spacer space="10" />
      <Text>
        Verification link has been sent to your email, kindly follow the link to
        verify your account.
      </Text>
      <Spacer space="20" />
      <PrimaryButton
        progress={isResending}
        style={{ width: '100%' }}
        onClick={handleResendClick}
      >
        Resend Verification Email
      </PrimaryButton>
      <Spacer space="10" />
      <Link to="/login">
        <Button pale style={{ width: '100%' }}>
          Login
        </Button>
      </Link>
    </Screen>
  );
};

export default Success;
