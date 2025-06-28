import { Row, Col, Typography, Space, Progress } from 'antd';
import Theme, { Colors } from '../../../utils/theme';
import { BulletDot } from '../../../styles/result/result.styles';
import { Liner } from '../../../styles/common/liner.styles';
import { ScoreBreakdown } from 'generated/index';

interface Props {
  scoreBreakDown?: ScoreBreakdown[];
}
const PerformanceOverview = ({ scoreBreakDown }: Props) => {
  return (
    <Space direction="vertical" size={40} style={{ width: '100%' }}>
      <Space direction="vertical" size={10} style={{ width: '100%' }}>
        <Typography.Text color={Colors.Grey700}>
          Performance by topics
        </Typography.Text>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Row gutter={20}>
            {scoreBreakDown?.map((score, i) => {
              return (
                <TopicCard
                  questionCount={score.questionCount}
                  score={score.score}
                  topic={score.topic}
                  key={i + score.topic}
                />
              );
            })}
          </Row>
        </Space>
      </Space>
      <div style={{ width: '100%', height: '15vh' }} />
    </Space>
  );
};

export default PerformanceOverview;

export const TopicCard = ({ topic, questionCount, score }: ScoreBreakdown) => {
  return (
    <Col span={24} style={{ marginTop: '.5rem' }}>
      <Space style={{ width: '100%' }} direction="vertical" size={10}>
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BulletDot color={Theme.PrimaryDark} />
            <Typography.Text
              style={{
                color: `${Colors.Grey700}`,
                textTransform: 'capitalize',
              }}
            >
              {topic}
            </Typography.Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '80%', height: 'fit-content' }}>
              <Progress
                strokeColor={Theme.Correct}
                trailColor={Theme.Incorrect}
                percent={(score / questionCount) * 100}
                showInfo={false}
              />
            </div>
            <span>
              {score}/{questionCount}
            </span>
          </div>
        </>
        <Liner />
      </Space>
    </Col>
  );
};
