import styled from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid lightgrey;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 550px) {
    width: 100%;
    flex-wrap: nowrap;
    gap: 0;
  }
`;

export const TabButton = styled.div<{ active: boolean }>`
  position: relative;
  color: ${(props) => (props.active ? '#000' : '#99A0AE')};
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  text-align: center;
  min-width: fit-content;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${(props) => (props.active ? 'blue' : 'transparent')};
    transition: background-color 0.3s ease;
  }

  @media screen and (max-width: 550px) {
    padding: 10px 8px;
    font-size: 14px;
    justify-content: center;
    flex: 0 0 auto;

    &::after {
      bottom: -1px;
      width: calc(100% - 16px);
      left: 8px;
    }
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

  @media screen and (max-width: 550px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    gap: 0;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
