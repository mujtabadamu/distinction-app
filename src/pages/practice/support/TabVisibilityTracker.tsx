import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsSuccessStudentPaperQuestions } from 'redux/studentPapers/selectors';
interface Props {
  limit: number;
  onSubmit: () => void;
}

const TabVisibilityTracker = ({ limit, onSubmit }: Props) => {
  const [switches, setSwitches] = useState(() => {
    const savedSwitches = localStorage.getItem('tabSwitches');
    return savedSwitches ? parseInt(savedSwitches, 10) : 0;
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isSubmitted = useSelector(selectIsSuccessStudentPaperQuestions);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const isHidden = document.hidden;

      if (isHidden && !hasSubmitted) {
        setSwitches((prev) => {
          const newSwitches = prev + 1;
          localStorage.setItem('tabSwitches', newSwitches.toString());
          return newSwitches;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasSubmitted]);

  useEffect(() => {
    if (switches === limit && !hasSubmitted) {
      const submitExam = async () => {
        try {
          await onSubmit();
          setHasSubmitted(true);
          localStorage.removeItem('tabSwitches');
        } catch (error) {
          console.error('Submission failed:', error);
        }
      };

      if (isSubmitted) return;
      submitExam();
    }
  }, [switches, limit, onSubmit, isSubmitted, hasSubmitted]);

  const isLastChance = switches >= limit - 1;

  return (
    <div>
      <div
        className={`mb-1 capitalize ${
          isLastChance ? 'text-red-500' : 'text-blue-500'
        }`}
      >
        {switches}/{limit} tab switches left. Exceeding will end the exam
      </div>
    </div>
  );
};

export default TabVisibilityTracker;
