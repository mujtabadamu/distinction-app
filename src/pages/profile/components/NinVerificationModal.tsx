import React, { ChangeEvent } from 'react';
import {
  Spacer,
  Box,
  Grid,
  Modal,
  ModalBody,
  Text,
  Input,
  Button,
  Notify,
} from '@flexisaf/flexibull2';
import useProfile from '../hooks/useProfile';

import { getLocalUser } from 'utils/helpers';
import { useForm } from 'react-hook-form';
import Theme from 'utils/theme';

interface IProps {
  openVerificationModal: boolean;
  onClose: () => void;
  canUpdateNin: boolean;
}
export type InstitutionI = {
  nin: string;
};

const NinVerificationModal = ({
  openVerificationModal,
  onClose,
  canUpdateNin,
}: IProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<InstitutionI>({
    defaultValues: {
      nin: '',
    },
  });
  const user = getLocalUser();
  const {
    updateNin,
    isVerifyingNin,
    verifyNin,
    getProfileData,
    isUpdatingNin,
  } = useProfile();
  
  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: InstitutionI) => {
    const payload = {
      nin: data.nin.toString(),
    };
    const studentId = user?.id as string;
    if (!canUpdateNin) {
      return Notify('Your profile must be complete to verify nin', {
        status: 'error',
      });
    }
    updateNin(payload, () => {
      verifyNin(() => {
        getProfileData(studentId);
        handleClose();
      });
    });
  };

  return (
    <>
      <Modal onClose={handleClose} open={openVerificationModal} outerclick>
        <ModalBody style={{ maxWidth: '570px' }} width="90%" bgColor="#fff">
          <Box pad="2rem">
            <Grid default="1fr" gap="20px">
              <Box style={{ borderBottom: '1px solid #EDEDED' }}>
                <Text bold size="1rem">
                  Verify National Identification Number(NIN)
                </Text>
                <Spacer space={10} />
                <Text size="14px">
                  Kindly verify your NIN to help us know you. Your details are
                  safe with us
                </Text>
                <Spacer space={3} />
              </Box>
              <Input
                block
                type="number"
                required
                spaceTop
                label="NIN"
                placeholder="Enter your NIN"
                value={watch('nin')}
                {...register('nin', {
                  required: 'Please enter your nin',
                })}
                error={errors?.nin?.message}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setValue('nin', e.target.value);
                }}
              />
              <Spacer space={2} />
              <Box width="100%">
                <Grid
                  default="max-content max-content"
                  style={{ justifyContent: 'space-between' }}
                >
                  <Button
                    block
                    onClick={onClose}
                    fontColor={Theme.PrimaryDark}
                    color={Theme.PrimaryDark}
                    pale
                  >
                    Cancel
                  </Button>
                  <Button
                    block
                    progress={isVerifyingNin || isUpdatingNin}
                    style={{ backgroundColor: '#2E4898', color: '#fff' }}
                    onClick={handleSubmit((data) => onSubmit(data))}
                  >
                    Verify Nin
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </ModalBody>
      </Modal>
    </>
  );
};

export default NinVerificationModal;
