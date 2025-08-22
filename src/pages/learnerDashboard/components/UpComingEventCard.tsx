import { Box } from '@flexisaf/flexibull2';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import { SimpleQuizathonView } from 'generated/index';
import { useNavigate } from 'react-router-dom';
interface Props {
  events: SimpleQuizathonView[] | undefined;
  isLoadingEvents: boolean;
}

function UpcomingEventCard({ events, isLoadingEvents }: Props) {
  const navigate = useNavigate();
  if (isLoadingEvents) {
    return (
      <Box
        className="!bg-white !rounded-md !border-[#E4E4E4] !border
                   w-full  !p-4"
      >
        <Skeleton width={120} height={20} />
        <Skeleton width={180} height={14} className="mt-1" />

        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            className="!border !border-[#E9F0F4] !rounded-[4px] !p-[14px] !mt-4"
          >
            <Skeleton width="70%" height={18} />
            <Skeleton width={100} height={14} className="mt-2" />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box
      className="!bg-white !rounded-2xl !border-[#E4E4E4] !border
                 w-full mx-auto !p-4"
    >
      <h2 className="text-base font-bold text-[#333333] tracking-[-0.02em]">
        Upcoming Events
      </h2>
      <p className="text-[13px] text-[#212121] mt-1">
        Your one-stop destination for event updates
      </p>

      <Box className="mt-2 space-y-4">
        {events?.map((event) => {
          const daysLeft = moment
            .duration(moment(event.startAt).diff(moment()))
            .asDays();
          const rounded = Math.max(0, Math.floor(daysLeft));

          return (
            <Box
              key={event.id}
              onClick={() => navigate(`/quizathon-profile/${event.id}`)}
              className="!border !border-[#E9F0F4] !rounded-[4px] cursor-pointer !p-[14px]"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-[#333333] m-0">
                  {event.title}
                </p>
                <div className="bg-[#F3F4F6] rounded-md p-2">
                  <i
                    style={{ fontSize: '12px' }}
                    className=" saf-arrow-right-1"
                  />
                </div>
              </div>

              <div className="flex items-center gap-[6px] text-[#52525B] mt-[10px]">
                <i
                  className="saf-calendar-1"
                  style={{ fontSize: '12px', lineHeight: 1 }}
                />
                <span className="text-[12px] font-normal">
                  Starts {rounded} {rounded === 1 ? 'Now' : 'in days'}
                </span>
              </div>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default UpcomingEventCard;
