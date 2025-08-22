import { Tabs as FlexiTabs } from '@flexisaf/flexibull2/build/tabs';
import { Text } from '@flexisaf/flexibull2/build/typo';
import { Box } from '@flexisaf/flexibull2/build/layout';

type TabProps = {
  intro: string;
  learningObjectives: string[];
  certificateUrl?: string;
};

export const Tabs = (props: TabProps) => {
  return (
    <div>
      <FlexiTabs responsive={false} bgColor="none" style={{ maxWidth: '100%' }}>
        <Box label="Description">
          <IntroductionTab intro={props.intro} />
        </Box>
        <Box label="Learning Objectives">
          <LearningObjectivesTab
            learningObjectives={props.learningObjectives}
          />
        </Box>
        {props.certificateUrl && (
          <Box label="Certificates">
            <CertificateTab
              certificateUrl={props.certificateUrl}
              isOpen={false}
            />
          </Box>
        )}
      </FlexiTabs>
    </div>
  );
};

const IntroductionTab = (p: { intro: string }) => {
  return <Description description={p.intro} />;
};

const LearningObjectivesTab = (p: { learningObjectives: string[] }) => {
  return (
    <ul>
      {p.learningObjectives.map((objective) => (
        <li className="flex items-center my-1 gap-2">
          <span>•</span>
          <Description key={objective} description={objective} />{' '}
        </li>
      ))}
    </ul>
  );
};

const CertificateTab = (p: { certificateUrl: string; isOpen?: boolean }) => {
  const lockedView = (
    <div>
      <Text block bold className="mb-3">
        Certificate is locked
      </Text>
      <Text block>Certificated would be unlocked once course is completed</Text>
    </div>
  );

  const openView = (
    <div>
      <Text block bold className="mb-3">
        Certificate is open
      </Text>
      <Text block>Congratulations on course completeion 🎈🎈🎈🎈</Text>
    </div>
  );
  return (
    <div>
      <Text block bold className="mb-2">
        {' '}
        Certificate{' '}
      </Text>
      <div className="rounded-md border ">
        {p.isOpen ? openView : lockedView}
      </div>
    </div>
  );
};
const Description = (p: { description: string }) => (
  <p className="text-[14px] m-0 p-0 leading-[24px]">{p.description}</p>
);
