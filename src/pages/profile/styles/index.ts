import styled from 'styled-components';
// import { Select } from '@flexisaf/flexibull2';
import devices from 'utils/devices';

// export const SelectStyle = styled(Select)`
//   & .flexi__control {
//     border: none;
//     background: none;
//     outline: none;
//   }
// `;

export const ActionButton = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  & .flexi-button {
    width: 100%;
    @media ${devices.tablet} {
      width: 150px;
    }
  }
`;

export const ContentWrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 12px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-around;

  width: 100%;
  & .share_button,
  .qr_code_button,
  .edit_button {
    height: 44px;
    padding: 10px;
  }
  @media (max-width: 768px) {
    & .share_button,
    .qr_code_button {
      width: 40%;
      margin: 10px 0px;
    }

    & .edit_button {
      width: 100% !important;
    }
  }
`;

export const ProfileHeader = styled.div`
  background-color: #eff3fe;
  height: 80px;
  border-radius: 8px;
  @media (min-width: 768px) {
    height: 120px;
  }
`;

export const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  padding: 0.5rem 1.5rem;
  gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: max-content auto;
    justify-items: unset;
  }
`;

export const ProfileImage = styled.img`
  width: 134px;
  height: 134px;
  border: 4px solid white;
  position: relative;
  top: -25px;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    text-align: unset;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }

  @media (min-width: 768px) {
    justify-content: unset;
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: #e1effe;
  color: #000;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  gap: 0.25rem;
  width: max-content;
  justify-self: center;

  @media (min-width: 768px) {
    justify-self: unset;
  }

  ${InfoRow} {
    margin-bottom: 0;
    color: currentColor;
  }
`;

export const PlanHeader = styled.div`
  background-color: #2563eb;
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const PlanTitle = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 700;

    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.875rem;
    opacity: 0.9;
  }
`;

export const ActiveBadge = styled.div`
  background-color: white;
  color: #2563eb;

  padding: 0.5rem 1rem;
  border-radius: 8px;
`;

export const PriceSection = styled.div`
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    border-right: 1px solid #8080808c;
  }
`;

export const Price = styled.div<{ priceColor?: string; subTextColor?: string }>`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.priceColor};
  margin-bottom: 1.5rem;

  span {
    font-size: 1rem;
    color: ${(props) => props.subTextColor || '#8E8E93'};
    font-weight: 400;
    margin-left: 0.2rem;
  }
`;

export const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const DateInfo = styled.div`
  p {
    margin-bottom: 0.5rem;
    color: #4b5563;
  }
`;
