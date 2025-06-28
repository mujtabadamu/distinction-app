import { Steps } from 'antd';
import { Spacer } from '@flexisaf/flexibull2';
import { motion } from 'framer-motion';

import { StepsWrapper } from '../../styles/dashboard/dashboard.styles';
import { Mobile, Laptop } from '../custom/wrapper';

interface Props {
  step: number;
  setStep: (step: number) => void;
  userFirstName?: string;
}

const DashboardSteps = ({ step, setStep }: Props) => {
  const steps = [
    {
      title: 'Pick exam',
      onClick: () => setStep(1),
      style: { cursor: 'pointer' },
    },
    {
      title: 'Choose mode',
      onClick: () => setStep(2),
      style: { cursor: 'pointer' },
    },
    {
      title: 'Personalize',
      onClick: () => setStep(3),
      style: { cursor: 'pointer' },
    },
  ];
  const variants = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };
  return (
    <StepsWrapper>
      <motion.div variants={variants} initial="hidden" animate="visible">
        <Spacer space="10px" />
        <Mobile>
          <Steps
            direction="horizontal"
            responsive={false}
            size="small"
            labelPlacement="vertical"
            current={step}
            items={steps}
          />
        </Mobile>

        <Laptop>
          <Steps
            direction="vertical"
            responsive={false}
            size="small"
            labelPlacement="vertical"
            current={step}
            items={steps}
          />
        </Laptop>
      </motion.div>
    </StepsWrapper>
  );
};

export default DashboardSteps;
