import {
  Text,
  Modal,
  ModalBody,
  ModalClose,
  Box,
  Spacer,
  Grid,
  Input,
  ModalFooter,
  Button,
  Select,
} from '@flexisaf/flexibull2';
import Theme from 'utils/theme';
import { ChangeEvent, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { getLocalUser } from 'utils/helpers';
import InfoBanner from 'components/infoBanner/InfoBanner';
import styled from 'styled-components';
import useReferrals from '../hooks/useReferrals';
import { ReferralStatisticsView } from 'generated/index';
import successImage from '../../../assets/images/successpayment.gif';
interface Props {
  openModal: { data: ReferralStatisticsView | null; open: boolean };
  handleClose: () => void;
  reload: () => void;
}
interface RequestApprovalForm {
  phoneNumber: string;
  amount: string;
  network: OptionI | null;
}

export type OptionI = {
  label: string;
  value: string;
};
const ClaimReward = ({ handleClose, openModal, reload }: Props) => {
  const user = getLocalUser();
  const studentId = user?.id as string;
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
    setValue,
  } = useForm<RequestApprovalForm>();
  const [step, setStep] = useState<number>(1);
  const {
    requestReward,
    isLoadingRewardRequest,
    requestError,
    airtimeSuccess,
  } = useReferrals(studentId);

  const balance = airtimeSuccess
    ? (airtimeSuccess.balance as number)
    : (openModal?.data?.totalUnclaimed as number);

  const amount = getValues('amount') ?? 0;
  const isDisabled = parseInt(amount) > balance;

  const formatBalance = (value: number | undefined): string => {
    return value !== undefined ? value.toFixed(2) : '0.00';
  };

  const onSubmit = (data: RequestApprovalForm) => {
    const payload = {
      phoneNumber: data.phoneNumber,
      network: data.network?.value,
      amount: parseInt(data.amount),
    };

    requestReward(payload, () => {
      setStep(step + 1);
      reload();
    });
  };

  const validateAmount = useCallback((value: string) => {
    const numValue = Number(value);
    if (numValue > balance) {
      return 'Amount cannot exceed your balance';
    }
    if (numValue > 20000) {
      return 'Amount cannot exceed NGN 20,000';
    }
    if (numValue <= 0) {
      return 'Amount must be greater than 0';
    }
    if (numValue % 100 !== 0) {
      return 'Amount must be in increments of 100';
    }
    return;
  }, []);

  const onhandleClose = () => {
    handleClose();
    reset();
    setStep(1);
  };

  return (
    <Modal onClose={onhandleClose} open={openModal.open}>
      <ModalBody style={{ maxWidth: '682px' }} width="90%" bgColor="#fff">
        <ModalClose onClick={onhandleClose}>&times;</ModalClose>
        <Spacer space={20} />
        {step === 1 && (
          <Box pad="1.5rem 2rem">
            <Spacer space={8} />

            <Text size="1.4rem" bold>
              Claim Airtime Reward
            </Text>
            <Spacer space={8} />
            <InfoBanner
              bgColor="#E7E7FF"
              infoText={
                <>
                  Please note: You can only claim a maximum of NGN 20,000 worth
                  of airtime at a time.
                </>
              }
              icon="saf-information"
            />
            <Text block size="0.9rem">
              <br />
              Your current balance is NGN {balance || 0}
            </Text>

            <Box>
              <Spacer space={40} />
              <Grid default="1fr 1fr" gap="30px">
                <Box>
                  <Input
                    block
                    label="Amount"
                    type="number"
                    value={watch('amount')}
                    placeholder="Enter amount"
                    maxLength={11}
                    {...register('amount', {
                      required: 'Amount is required',
                      validate: (value) => validateAmount(value),
                    })}
                    error={errors.amount?.message}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setValue('amount', e.target.value);
                    }}
                  />
                </Box>
                <Input
                  block
                  label="Phone Number"
                  maxLength={11}
                  value={watch('phoneNumber')}
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^0\d{10}$/,
                      message: 'Phone number must start  0 and  11 digits long',
                    },
                    validate: (value) => {
                      if (value.length !== 11) {
                        return 'Phone number must be exactly 11 digits';
                      }
                      if (!value.startsWith('0')) {
                        return 'Phone number must start with 0';
                      }
                      return true;
                    },
                  })}
                  placeholder="Ex: 08000001231"
                  error={errors.phoneNumber?.message}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setValue('phoneNumber', e.target.value);
                  }}
                />
              </Grid>
              <Select
                block
                placeholder="Select Network"
                label="Network"
                value={watch('network')}
                style={{ marginTop: '2rem' }}
                {...register('network', { required: 'Network is required' })}
                error={errors.network?.message}
                onChange={(value: OptionI) => setValue('network', value)}
                options={[
                  { label: 'GLO', value: 'GLO' },
                  { label: 'MTN', value: 'MTN' },
                  { label: 'AIRTEL', value: 'AIRTEL' },
                  { label: '9MOBILE', value: '9MOBILE' },
                ].map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
              />
            </Box>
          </Box>
        )}

        {step === 2 && (
          <>
            {requestError ? (
              <ErrorWrapper>
                <Text size="1rem " bold>
                  An error occurred while processing your request.
                </Text>
                <Spacer space={10} />
                <Text size="1rem" style={{ color: '#757575' }}>
                  Retry Again
                </Text>
              </ErrorWrapper>
            ) : (
              <SuccessWrapper>
                <Spacer space={20} />
                <InfoBanner
                  bgColor="#E7E7FF"
                  infoTitle="Thank you for your referral! "
                  infoText={
                    <>
                      <p>
                        Please note that airtime delivery may occasionally
                        experience delays due to network or other unforeseen
                        challenges. If you do not receive your airtime within 24
                        hours, feel free to reach out to us at {''}
                        <a
                          href="mailto:distinction@flexisaf.com"
                          style={{
                            color: Theme.PrimaryColor,
                          }}
                        >
                          distinction@flexisaf.com
                        </a>{' '}
                        and we’ll be happy to assist you.
                      </p>
                    </>
                  }
                  icon="saf-information"
                />
                <Spacer space={10} />
                <Box className="success-text">
                  <img
                    alt="success image"
                    style={{
                      width: '120px',
                      height: '120px',
                    }}
                    src={successImage}
                  />
                  <Spacer space={10} />
                  <Text size="1rem" style={{ textAlign: 'center' }}>
                    <strong> NGN {airtimeSuccess?.amount} </strong>airtime was
                    successfully sent to
                    <strong> {airtimeSuccess?.phoneNumber}</strong> <br />
                    Your balance is{' '}
                    <strong>
                      NGN {formatBalance(airtimeSuccess?.balance)}
                    </strong>
                  </Text>
                </Box>
              </SuccessWrapper>
            )}
          </>
        )}
        <ModalFooter footercolor="#fff">
          <Box
            pad="1.5rem"
            display="flex"
            style={{ justifyContent: 'space-between' }}
          >
            <Button
              pale
              onClick={onhandleClose}
              color={Theme.PrimaryLight}
              align="right"
              fontColor={Theme.PrimaryFontColor}
              style={{ marginRight: '10px' }}
            >
              Close
            </Button>
            {step <= 1 && (
              <Button
                disabled={isDisabled}
                onClick={handleSubmit((data) => onSubmit(data))}
                progress={isLoadingRewardRequest}
              >
                Claim Airtime
              </Button>
            )}
            {step > 1 && balance > 0 && (
              <Button onClick={() => setStep(step - 1)}>Claim Again</Button>
            )}
            {step > 1 && requestError && (
              <Button onClick={() => setStep(step - 1)}>Retry</Button>
            )}
          </Box>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default ClaimReward;

const SuccessWrapper = styled(Box)`
  padding: 1rem;
  margin: 0 auto;
  margin-top: 1rem;
  & .success-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const ErrorWrapper = styled(Box)`
  padding: 1.5rem 2rem;
  text-align: center;
`;
