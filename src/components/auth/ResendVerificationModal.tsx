import { Box, Text, Spacer, Input, Button, Grid } from '@flexisaf/flexibull2';
import { useForm } from 'react-hook-form';
import { isValidEmail } from 'utils/helpers';
import { PLATFORM, PlatformType } from 'utils/constants';
import styled from 'styled-components';
import { SecondaryButton } from 'styles/common/buttons.styles';
import useResendVerification from 'hooks/general/useResendVerification';

export type IResendVerification = {
  email: string;
};
interface Props {
  activeEmail: string;
  handleClose: () => void;
}

const VerificationModal = ({ activeEmail, handleClose }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<IResendVerification>({
    defaultValues: {
      email: activeEmail || '',
    },
  });

  const { resendVerificationEmail, isResending } = useResendVerification();
  const onSubmit = (data: IResendVerification) => {
    resendVerificationEmail(
      {
        username: data.email,
        platform: PLATFORM as PlatformType,
      },
      () => {
        handleClose();
      }
    );
  };

  return (
    <ResendModal>
      <Box pad="24px 32px">
        <Text block bold size="1.2rem">
          Resend Verififcation
        </Text>
        <Spacer space="10px" />
        <Text>
          The email you are trying to login with is not verified, Please enter
          your email address to receive a verification link.
        </Text>
      </Box>

      <Box pad="32px">
        <Input
          block
          label="Email Address"
          required
          placeholder="Enter your email"
          type="text"
          isLoading={false}
          value={watch('email') as string}
          {...register('email', {
            required: 'Email is required',
            validate: (val) => {
              if (!isValidEmail(val)) {
                return 'Please enter a valid email';
              }
            },
          })}
          error={errors.email?.message as string | undefined}
          onChange={({ target: { value } }: { target: { value: string } }) =>
            setValue('email', value)
          }
        />
        <Spacer space="30px" />
        <Grid default="auto max-content" responsive={false} className="bt">
          <Box>
            <SecondaryButton
              onClick={() => {
                handleClose();
              }}
              pale
              color="rgba(0,0,0,0.0)"
            >
              Close
            </SecondaryButton>
          </Box>
          <Button
            style={{ width: '100%' }}
            progress={isResending}
            onClick={handleSubmit((data) => onSubmit(data))}
          >
            Submit
          </Button>
        </Grid>
      </Box>
    </ResendModal>
  );
};

const ResendModal = styled(Box)`
  padding: 1rem;
  max-width: 700px;
`;
export default VerificationModal;
