import { ChangeEvent } from 'react';
import { Box, Text, Spacer, Input, Button } from '@flexisaf/flexibull2';
import { Screen } from '../styles';
import Theme from 'utils/theme';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UploadedStudentView } from 'generated/index';

export type MatriculationNO = {
  matriculatioNo: string;
};

interface Props {
  steps: number;
  setSteps: (x: number) => void;
  getValidateStudent: (matriculationNumber: string, cb: () => void) => void;
  error: string | null;
  loadingValidateStudent: boolean;
  studentValidated: UploadedStudentView | null;
}

const MatriculationScreen = ({
  steps,
  setSteps,
  getValidateStudent,
  error,
  loadingValidateStudent,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MatriculationNO>({
    defaultValues: {
      matriculatioNo: '',
    },
  });

  const onSubmit = (data: MatriculationNO) => {
    const matriculationNumber = data.matriculatioNo;
    getValidateStudent(matriculationNumber, () => {
      setSteps(steps + 1);
    });
  };

  return (
    <Screen maxWidth="430px" style={{ textAlign: 'center' }}>
      <Text style={{ fontWeight: '500' }} size="1.4rem">
        {error ? 'No record found' : "Let's get started"}
      </Text>
      <Spacer space="10" />
      {error ? (
        <>
          <Text color="#B3261E" size="14px">
            {error}
          </Text>
          <br />
          <Link to="/signup">
            <Text
              color={Theme.PrimaryColor}
              style={{
                cursor: 'pointer',
                fontWeight: 'bold',
                margin: '0 0.2rem',
              }}
              bold
            >
              Click here to signup
            </Text>
          </Link>
        </>
      ) : (
        <>
          <Text style={{ fontWeight: '400', color: '#151515' }}>
            Enter your Matric/Reg. number to activate your account
          </Text>
        </>
      )}
      <Spacer space="50" />
      <Box className="container">
        <Input
          block
          label="Matric/Reg No"
          required
          placeholder="--- --- ---"
          type="text"
          isLoading={false}
          error={errors.matriculatioNo?.message as string | undefined}
          {...register('matriculatioNo', {
            required: 'Please enter your matriculation number',
            minLength: {
              value: 6,
              message:
                'Matriculation number must be at least 6 characters long',
            },
          })}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue('matriculatioNo', e.target.value);
          }}
          style={{
            borderColor: error && '#B3261E',
            color: error && '#B3261E',
          }}
        />
        <Spacer space="25" />
        <Button
          style={{ width: '100%' }}
          progress={loadingValidateStudent}
          onClick={handleSubmit(onSubmit)}
        >
          {error ? 'Retry' : 'Proceed'}
        </Button>

        <Spacer space="25" />
        <Text
          size="12px"
          color={Theme.PrimaryColor}
          style={{ textAlign: 'center', margin: '0 4px' }}
          block
        >
          Already Activated?{' '}
          <Link to="/login">
            <Text
              color={Theme.PrimaryColor}
              style={{ cursor: 'pointer', fontWeight: 'bold' }}
              bold
            >
              Click here to login
            </Text>
          </Link>
        </Text>
      </Box>
      <Spacer space="30" />
    </Screen>
  );
};

export default MatriculationScreen;
