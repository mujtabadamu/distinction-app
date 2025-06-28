import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Text, Spacer, ProgressBar } from '@flexisaf/flexibull2';
import { FiX } from 'react-icons/fi';
import Theme, { Colors } from '../../utils/theme';
import { IRecentPractice } from '../../hooks/practice/useRecentPracticesQuery';

import { setShowContinuePractice } from '../../redux/statistics/reducer';

interface IContinuePractice {
  // setShowContinuePractice: (value: boolean) => void;
  mostRecent: IRecentPractice | null;
}

const ContinuePractice = ({
  // setShowContinuePractice,
  mostRecent,
}: IContinuePractice) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <ContinuePracticeWrapper>
      <div className="top">
        <Text size="16px" color={Colors.Grey700}>
          Jump back in
        </Text>

        <div
          onClick={() => {
            dispatch(setShowContinuePractice(false));
          }}
        >
          <FiX size="16px" />
        </div>
      </div>

      <Spacer space="30px" />

      <div className="body">
        <div style={{ width: '55%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div>
              <Text block color={Colors.Grey700} size="12px">
                {mostRecent?.exam}
              </Text>
              <Text
                color={Colors.Grey500}
                style={{ textTransform: 'capitalize' }}
              >
                {mostRecent?.mode} mode
              </Text>
            </div>
          </div>
          <Spacer space="10px" />
          {mostRecent?.mode === 'real' && (
            <ProgressBar
              value={Math.floor(
                ((mostRecent?.timeElapsed || 0) / (mostRecent?.duration || 0)) *
                  100
              )}
              color={Theme.PrimaryColor}
            />
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Text
            color={Theme.PrimaryColor}
            bold
            onClick={() => navigate(`/student-papers/${mostRecent?.id}`)}
          >
            Continue
          </Text>

          <i
            className="saf-arrow-right-1"
            style={{ color: Theme.PrimaryColor, fontSize: '1.1rem' }}
          />
        </div>
      </div>
    </ContinuePracticeWrapper>
  );
};

export default ContinuePractice;

const ContinuePracticeWrapper = styled.div`
  width: 95%;
  background-color: white;
  padding: 15px;
  align-self: center;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  & .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;
