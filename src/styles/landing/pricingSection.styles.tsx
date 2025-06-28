import styled from 'styled-components';
import devices from '../../utils/devices';
import { FaCheck } from 'react-icons/fa';
import Theme from '../../utils/theme';
import { motion } from 'framer-motion';
import { PaystackButton } from 'react-paystack';

export const SubText = styled.h5`
  margin-top: 4rem;
  font-weight: bold;
`;

export const ProvidersWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: start;
  margin-top: 1rem;

  @media ${devices.laptop} {
    gap: 1.5rem;
  }
`;

export const MethodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
`;

export const ProviderWrapper = styled.div<{
  provider: string;
  selectedProvider?: string;
}>`
  background-color: ${(props) =>
    props.provider === props?.selectedProvider ? 'white' : 'transparent'};
  padding: 0.6rem;
  border-radius: 5px;
  box-shadow: ${(props) =>
    props.provider === props?.selectedProvider &&
    '0px 283px 113px rgba(199, 199, 199, 0.01), 0px 159px 95px rgba(199, 199, 199, 0.05), 0px 71px 71px rgba(199, 199, 199, 0.09), 0px 18px 39px rgba(199, 199, 199, 0.1), 0px 0px 0px rgba(199, 199, 199, 0.1)'};
  cursor: pointer;
`;

export const Provider = styled.img`
  width: 2rem;
`;

export const PlansWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 1rem;
  margin-top: 1rem;
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media ${devices.laptop} {
    gap: 1.5rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    width: 100%;
    flex-wrap: wrap;
    overflow-x: initial;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Plan = styled.div<{ recommended?: boolean }>`
  width: 80%;
  flex: 0 0 auto;
  background-color: ${(props) =>
    props.recommended ? Theme.PrimaryColor : 'none'};
  border-radius: 10px;
  padding: 1rem;
  height: fit-content;

  @media ${devices.tablet} {
    width: 50%;
  }

  @media ${devices.laptop} {
    width: 100%;
    padding: ${(props) => (props.recommended ? '1.5rem 1rem' : '1rem')};
    flex: auto;
  }
`;

export const Title = styled.h5<{ recommended?: boolean }>`
  --tw-text-opacity: 1;
  color: ${(props) =>
    props.recommended ? 'white' : 'rgb(31 41 55 / var(--tw-text-opacity))'};
  font-size: 1rem;
  font-weight: 700;

  @media ${devices.laptop} {
    font-size: 1.5rem;
  }
`;

export const SubTitle = styled.span<{ recommended?: boolean }>`
  font-weight: normal;
  --tw-text-opacity: 1;
  color: ${(props) =>
    props.recommended ? 'white' : 'rgb(75 85 99 / var(--tw-text-opacity))'};
  font-size: 0.5rem;

  @media ${devices.laptop} {
    font-size: 0.8rem;
  }
`;

export const Price = styled.h6<{ recommended?: boolean }>`
  font-size: 1.2rem;
  --tw-text-opacity: 1;
  color: ${(props) =>
    props.recommended ? 'white' : 'rgb(31 41 55 / var(--tw-text-opacity))'};
  font-weight: 600;
  margin-top: 1rem;
  @media ${devices.laptop} {
    font-size: 1.7rem;
  }
`;

export const PlanGroup = styled.span<{ recommended?: boolean }>`
  --tw-text-opacity: 1;
  color: ${(props) =>
    props.recommended
      ? '#E0E0E0'
      : 'rgb(156 163 175 / var(--tw-text-opacity))'};
  text-transform: capitalize;
`;

export const PlanPerks = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media ${devices.laptop} {
    margin-top: 4rem;
    margin-bottom: 6rem;
    gap: 1rem;
  }
`;

export const Perk = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Check = styled(FaCheck)<{ recommended?: boolean }>`
  color: ${(props) => (props.recommended ? 'white' : Theme.PrimaryColor)};
  font-size: 0.7rem;
`;

export const PerkText = styled.span<{ recommended?: boolean }>`
  font-size: 0.6rem;
  font-weight: 400;
  --tw-text-opacity: 1;
  color: ${(props) =>
    props.recommended ? '#E0E0E0' : 'rgb(75 85 99 / var(--tw-text-opacity))'};
  @media ${devices.laptop} {
    font-size: 0.7rem;
  }
`;

export const PaystackStyledButton = styled(PaystackButton)<{
  disabled: boolean;
  recommended?: boolean;
}>`
  border-radius: 3px;
  font-size: 0.8rem;
  height: 40px;
  color: ${(props) => {
    if (props.disabled) {
      return '#8E8E8E';
    }

    if (props.recommended) {
      return Theme.PrimaryColor;
    }

    return 'white';
  }};
  background-color: ${(props) => {
    if (props.disabled) {
      return Theme.PrimaryInactive;
    }

    if (props.recommended) {
      return 'white';
    }

    return Theme.PrimaryColor;
  }};

  width: 100%;
  border: none;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'inherit')};
`;
