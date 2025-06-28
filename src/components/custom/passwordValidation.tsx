import React, { useState } from 'react';
import { Input, Grid, Text } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import Theme from '../../utils/theme';
import { validate } from '../../utils/passwordValidate';
import {
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PasswordInputContainer = styled(Grid)`
  position: relative;
  height: fit-content;
`;

const ValidationInfo = styled(Grid)`
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  background-color: white;
  z-index: 100;
  margin-top: 5px;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid ${Theme.PrimaryBorderColor};
`;

const ValidationItem = styled.div<{ validate: boolean | undefined }>`
  color: ${(props) => (props.validate ? 'red' : `${Theme.PrimaryColor}`)};
  font-size: 11px;
`;

interface IPasswordCheck<T extends FieldValues> {
  criteria: string;
  message: string;
  getValues: UseFormGetValues<T>;
}
const PasswordCheck = <T extends FieldValues>({
  criteria,
  message,
  getValues,
}: IPasswordCheck<T>) => {
  return (
    <ValidationItem validate={validate(getValues().password, `${criteria}`)}>
      {validate(getValues().password, `${criteria}`) ? (
        <FaTimes />
      ) : (
        <FaCheck />
      )}
      <Text style={{ marginLeft: '5px' }} color={Theme.PrimaryGrey}>
        {message}
      </Text>
    </ValidationItem>
  );
};

interface IPasswordValidation<T extends FieldValues> {
  watch: UseFormWatch<T>;
  register: UseFormRegister<T>;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  fieldErrors: FieldErrors;
  field: Path<T>;
  type: string;
  showPassword: boolean;
  label: string;
  placeholder?: string;
  iconRight?: React.ReactNode;
}

const PasswordValidation = <T extends FieldValues>({
  watch,
  register,
  getValues,
  setValue,
  fieldErrors,
  field,
  type,
  showPassword,
  placeholder,
  ...props
}: IPasswordValidation<T>) => {
  const [showValidationInfo, setShowValidationInfo] = useState(false);
  const hideValidation = () => setShowValidationInfo(false);
  const showValidation = () => setShowValidationInfo(true);

  return (
    <PasswordInputContainer
      onBlur={hideValidation}
      default="1fr"
      gap="0"
      responsive={false}
    >
      <Input
        spaceTop
        type={showPassword ? 'text' : type}
        style={{ backgroundColor: '#F7F7FF' }}
        onFocus={showValidation}
        tabIndex={0}
        required
        placeholder={placeholder || `Enter ${field}`}
        value={watch(field)}
        {...register(field, {
          required: `${field} is required`,
          ...(type === 'password'
            ? {
                minLength: {
                  value: 8,
                  message: `${field} must have at least 8 characters`,
                },
                maxLength: {
                  value: 30,
                  message: `${field} must not be more than 30 characters`,
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/,
                  message: `${field} must contain at least one number, special character, capital case and small case letter`,
                },
              }
            : {}),
        })}
        error={fieldErrors[field]?.message}
        onChange={({
          target: { value },
        }: {
          target: { value: PathValue<T, Path<T>> };
        }) => {
          setValue(field, value.trim());
        }}
        {...props}
      />
      {showValidationInfo && (
        <ValidationInfo default="1fr" gap="5px">
          <PasswordCheck
            getValues={getValues}
            criteria="length"
            message="must be 8 characters or more"
          />
          <PasswordCheck
            getValues={getValues}
            criteria="hasNumeric"
            message="must include at least one number"
          />
          <PasswordCheck
            getValues={getValues}
            criteria="hasLowerCase"
            message="must include at least one lowercase letter"
          />
          <PasswordCheck
            getValues={getValues}
            criteria="hasUpperCase"
            message="must include at least one uppercase letter"
          />
          <PasswordCheck
            getValues={getValues}
            criteria="hasSpecialCharacter"
            message="must include at least one special character"
          />
        </ValidationInfo>
      )}
    </PasswordInputContainer>
  );
};

export default PasswordValidation;
