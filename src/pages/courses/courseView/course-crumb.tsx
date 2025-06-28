import { Button, Text } from '@flexisaf/flexibull2';
import { useNavigate } from 'react-router-dom';

import { Colors } from 'utils/theme';

export const CourseCrumb = (p: { courseTitle: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 text-gray-700 text-smaller ">
      <Button
        style={{ padding: '0 4px' }}
        plain
        onClick={() => navigate('/courses')}
        color={Colors.Grey700}
      >
        Course
      </Button>
      <Text> ▸ </Text>
      <Text>{p.courseTitle}</Text>
    </div>
  );
};
