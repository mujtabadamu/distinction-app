import styled from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  max-width: 320px;
  width: 100%;
  border-radius: 8px;
  padding: 0.2rem;
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

export const TabButton = styled.div<{ active: boolean }>`
  width: 154px;
  border-radius: ${(props) => (props.active ? '4px' : '0px')};
  box-shadow: ${(props) =>
    props.active ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'none'};
  background: ${(props) => (props.active ? '#fff' : 'transparent')};
  border: ${(props) =>
    props.active ? '1px solid #15A4EE96' : '1px solid transparent'};
  color: ${(props) => (props.active ? '#000' : '#99A0AE')};
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

export const TabPanel = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
`;

export const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Label = styled.span`
  font-size: 12px;
  font-weight: 40;

  & strong {
    color: #387adf;
  }
`;

export const Preview = styled.div`
  border: 2px dashed #cdcfd0;
  background-color: #f7f9fa;
  padding: 1rem;
  border-radius: 6px;
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;

  & span {
    font-size: 12px;
    font-weight: 400;
  }
`;
