import { Text, Button, Spacer } from '@flexisaf/flexibull2';

import { Scholarship } from './scholarship';
import moment from 'moment';

export const ScholarshipCard: React.FC<Scholarship> = ({
  title,
  programType,
  duration,
  scholarshipDeadline,
  scholarshipWorth,
  scholarshipUrl,
}) => {
  const status = new Date(scholarshipDeadline) > new Date();
  return (
    <div className=" w-full border rounded-md">
      <div className="bg-blue-700  px-2 py-3 rounded-t">
        <Text
          block
          className="text-[16px] mb-1 text-white font-semibold inline-block"
        >
          {title}
        </Text>
        <p
          className={` px-2 py-1 text-xs my-3 font-bold w-fit rounded ${
            status ? 'bg-white text-green-600' : 'bg-white text-red-500'
          }`}
        >
          {status ? 'Application Open' : 'Application is Closed'}
        </p>
      </div>
      <div className="p-2">
        <div className="flex justify-between">
          <div className="mt-3">
            <Text block className="text-sm text-[#8E8E93]">
              Program Type
            </Text>
            <Text className="font-medium">{programType}</Text>
          </div>
          <div className="mt-3">
            <Text block className="text-sm text-[#8E8E93]">
              Scholarship Worth
            </Text>
            <Text block className="font-medium !text-right">
              {scholarshipWorth}
            </Text>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mt-3">
            <Text block className="text-sm text-[#8E8E93]">
              Duration
            </Text>
            <Text className="font-medium">{duration}</Text>
          </div>
          <div className="mt-3">
            <Text block className="text-sm text-[#8E8E93]">
              Deadline
            </Text>
            <Text block className="font-medium !text-right">
              {moment(scholarshipDeadline).format('Do MMM, YYYY')}
            </Text>
          </div>
        </div>
      </div>

      <Button
        disabled={!status}
        className=" mx-2 rounded-md"
        onClick={() => window.open(scholarshipUrl, '_blank')}
      >
        Apply Now
      </Button>
      <Spacer space={20} />
    </div>
  );
};
