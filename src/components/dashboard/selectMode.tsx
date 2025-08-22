import { ModeBox, Swiper } from '../../styles/dashboard/dashboard.styles';
import { Text, Spacer, CardSelector } from '@flexisaf/flexibull2';
import { Tag } from 'antd';

import { ModeWrapper } from '../../styles/dashboard/dashboard.styles';
import Theme from '../../utils/theme';
import { ExamGroup } from 'store/result';

interface Props {
  mode: null | 'real' | 'learning';
  setMode: (mode: 'real' | 'learning' | null) => void;
  selectedExamGroup: ExamGroup | null;
  setStep: (step: number) => void;
}

const SelectMode = ({ mode, setMode, selectedExamGroup, setStep }: Props) => {
  const variants = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.3,
      },
    },
    exit: {
      x: 100,
      opacity: 0,
    },
  };
  return (
    <Swiper variants={variants} initial="hidden" animate="visible" exit="exit">
      <Tag color="blue">{selectedExamGroup?.name}</Tag>
      <Spacer space="10px" />

      {/* <Spacer space="10px" />
      <Text
        block
        // center
        {...fontSize.h3}
        style={{ textAlign: 'center' }}
      >
        Choose your mode
      </Text> */}
      <Text block style={{ textAlign: 'center' }}>
        How would you like to practice?
      </Text>
      <Spacer space="10px" />
      <ModeWrapper>
        <CardSelector
          name="select"
          value="1"
          view="label"
          onChange={() => setMode('learning')}
          checked={mode === 'learning'}
          label="Learning Mode"
          type="radio"
          description="Personalized question selection and solution viewing without time restrictions."
          data-tour="select-mode"
        />
        <CardSelector
          name="select"
          value="1"
          view="label"
          label="Real Mode"
          checked={mode === 'real'}
          onChange={() => setMode('real')}
          type="radio"
          description="Practice like it is the actual exam. Timed environments and solutions only at the end."
          data-tour="select-mode"
        />
        <Text
          color={Theme.PrimaryColor}
          style={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => setStep(1)}
        >
          Go back
        </Text>

        {mode === 'real' && (
          <ModeBox>
            <Text bold block color={Theme.PrimaryColor}>
              Real Mode
            </Text>
            <Text style={{ lineHeight: '20px' }}>
              {/* <li>
                The real mode simulates a real-world assessment as closely as
                possible and includes a timer.
              </li>
              <li>
                You will only see the answers to the questions at the end of the
                session, just like a real exam.
              </li> */}
              <li>
                The goal of real mode is to help you get a feel of what it's
                like to take the actual exam so you can properly assess your
                performance.
              </li>
            </Text>
          </ModeBox>
        )}

        {mode === 'learning' && (
          <ModeBox>
            <Text bold block color={Theme.PrimaryColor}>
              Learning Mode
            </Text>
            <Text style={{ lineHeight: '20px' }}>
              {/* <li>
                Allows you select areas to focus on and practice questions
                without any time restrictions.
              </li>
              <li>
                Have access to solutions on a question-by-question basis, which
                you can review at your own pace.
              </li> */}
              <li>
                The goal of the learning mode is to help you better understand
                the concepts and improve your knowledge in a flexible and
                self-paced way.
              </li>
            </Text>
          </ModeBox>
        )}
      </ModeWrapper>
    </Swiper>
  );
};

export default SelectMode;
