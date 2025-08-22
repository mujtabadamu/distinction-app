import { Box, Text } from '@flexisaf/flexibull2';
import { KeypointView, PaperView } from 'generated/index';
import moment from 'moment';

interface Props {
  keypoint: KeypointView;
  paper?: PaperView;
  isFullView?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onShare?: () => void;
}

const ActiveKeyPointView = ({
  keypoint,
  paper,
  onOpen,
  isFullView,
  onClose,
  onShare,
}: Props) => {
  const width = isFullView ? 'w-full' : 'w-full md:w-[80%] xl:w-[60%]';
  const height = isFullView ? 'h-[95vh]' : 'h-[80vh]';
  return (
    <>
      <Box className={`${height} flex flex-col items-center !mt-4`}>
        <Box
          className={`flex !pb-2 border-b !mb-2 justify-between items-center ${width}`}
        >
          <Text className={`text-[14px] ${isFullView && 'text-white'}`}>
            {paper?.name}
          </Text>
          <Box
            className="cursor-pointer"
            onClick={isFullView ? onClose : onOpen}
          >
            <Expand isFullView={isFullView} />
          </Box>
        </Box>
        <Box
          className={`overflow-scroll !p-4 md:!px-6 rounded-lg bg-white flex-1 !max-h-[75%] ${width} border-t border-l`}
        >
          <Text block className="text-[16px] font-semibold">
            {keypoint.title}
          </Text>
          <Text block className="!mt-2">
            {moment(keypoint?.updatedAt).format('DD/MM/YYYY')}
          </Text>

          <Box>
            {keypoint?.points?.map((point, index) => (
              <Box key={point.id} className="!mt-6">
                <Text block className="text-[14px] font-semibold">
                  {index + 1}. {point.title}
                </Text>
                <Text block className="!mt-2 leading-5">
                  {point.point}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          className={`border-t !mt-4 ${width} flex items-center justify-between !pt-4 `}
        >
          <div className="w-[50px]" />
          <div className="w-[50px]" />

          <Box
            onClick={onShare}
            className={`flex items-center space-x-2 cursor-pointer ${
              isFullView && 'text-white'
            }`}
          >
            <i className="saf-share  text-xl " />
            <Text className="">Share</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const Expand = ({ isFullView }: { isFullView?: boolean }) => {
  const color = isFullView ? '#FFF' : '#141B34';
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.03033 21.0303C3.73744 21.3232 3.26256 21.3232 2.96967 21.0303C2.67678 20.7374 2.67678 20.2626 2.96967 19.9697L4.03033 21.0303ZM9.46967 13.4697C9.76256 13.1768 10.2374 13.1768 10.5303 13.4697C10.8232 13.7626 10.8232 14.2374 10.5303 14.5303L9.46967 13.4697ZM10.5303 14.5303L4.03033 21.0303L2.96967 19.9697L9.46967 13.4697L10.5303 14.5303Z"
        fill={color}
      />
      <path
        d="M19.9697 21.0303C20.2626 21.3232 20.7374 21.3232 21.0303 21.0303C21.3232 20.7374 21.3232 20.2626 21.0303 19.9697L19.9697 21.0303ZM14.5303 13.4697C14.2374 13.1768 13.7626 13.1768 13.4697 13.4697C13.1768 13.7626 13.1768 14.2374 13.4697 14.5303L14.5303 13.4697ZM13.4697 14.5303L19.9697 21.0303L21.0303 19.9697L14.5303 13.4697L13.4697 14.5303Z"
        fill={color}
      />
      <path
        d="M4.03033 2.96967C3.73744 2.67678 3.26256 2.67678 2.96967 2.96967C2.67678 3.26256 2.67678 3.73744 2.96967 4.03033L4.03033 2.96967ZM9.46967 10.5303C9.76256 10.8232 10.2374 10.8232 10.5303 10.5303C10.8232 10.2374 10.8232 9.76256 10.5303 9.46967L9.46967 10.5303ZM10.5303 9.46967L4.03033 2.96967L2.96967 4.03033L9.46967 10.5303L10.5303 9.46967Z"
        fill={color}
      />
      <path
        d="M19.9697 2.96967C20.2626 2.67678 20.7374 2.67678 21.0303 2.96967C21.3232 3.26256 21.3232 3.73744 21.0303 4.03033L19.9697 2.96967ZM14.5303 10.5303C14.2374 10.8232 13.7626 10.8232 13.4697 10.5303C13.1768 10.2374 13.1768 9.76256 13.4697 9.46967L14.5303 10.5303ZM13.4697 9.46967L19.9697 2.96967L21.0303 4.03033L14.5303 10.5303L13.4697 9.46967Z"
        fill={color}
      />
      <path
        d="M3.09779 16C3.09779 16 2.74194 19.9663 3.38785 20.6122C4.03375 21.2581 8 20.9022 8 20.9022"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9022 16C20.9022 16 21.2581 19.9663 20.6122 20.6122C19.9662 21.2581 16 20.9022 16 20.9022"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.09779 8C3.09779 8 2.74194 4.03374 3.38785 3.38783C4.03375 2.74191 8 3.09783 8 3.09783"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9022 8C20.9022 8 21.2581 4.03374 20.6122 3.38783C19.9662 2.74191 16 3.09783 16 3.09783"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ActiveKeyPointView;
