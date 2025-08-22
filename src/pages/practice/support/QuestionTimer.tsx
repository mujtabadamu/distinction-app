import { Text, Spacer } from '@flexisaf/flexibull2';
import Theme from 'utils/theme';

interface TimerI {
  hours: number; // Hours left
  minutes: number; // Minutes left
  seconds: number; // Remaining seconds
  onExpireCallback?: () => void; // Callback when the timer expires
}

const QuestionTimer = ({
  hours,
  minutes,
  seconds,
}: // onExpireCallback,
TimerI) => {
  // Trigger the callback when time reaches 0
  // React.useEffect(() => {
  //   if (hours === 0 && minutes === 0 && seconds === 0) {
  //     onExpireCallback();
  //   }
  // }, [hours, minutes, seconds, onExpireCallback]);

  return (
    <>
      <Text size="1rem">Time Left</Text>
      <Spacer space={10} />
      <Text
        size="1.5rem"
        color={`${
          hours === 0 && minutes < 1 ? Theme.PrimaryRed : Theme.PrimaryColor
        }`}
      >
        {(hours ?? 0).toString().padStart(2, '0')}:
        {(minutes ?? 0).toString().padStart(2, '0')}:
        {(seconds ?? 0).toString().padStart(2, '0')}
      </Text>
    </>
  );
};

export default QuestionTimer;
