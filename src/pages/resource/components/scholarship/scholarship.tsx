import { Box, Text, Button, Spacer } from '@flexisaf/flexibull2';
import { ScholarshipCard } from './scholarship-card';
import useFetch from 'pages/resource/hooks/useFetch';
import { DISTINCTION_RESOURCE_BASE_URL } from 'utils/constants';
import SectionLoader from 'components/custom/sectionLoader';

export type Scholarship = {
  id: number;
  documentId: string;
  title: string;
  programType: string;
  scholarshipWorth: string;
  duration: string;
  scholarshipDeadline: string;
  scholarshipUrl: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  scholarshipId: string;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

interface ScholarshipResponse {
  data: Scholarship[];
  meta: {
    pagination: PaginationMeta;
  };
}

const Scholarship = () => {
  const { loading, error, data, refetch } = useFetch<ScholarshipResponse>(
    `${DISTINCTION_RESOURCE_BASE_URL}/api/scholarships`
  );

  return (
    <Box className="p-4" maxWidth="1200px" width="80%" margin="0 auto">
      {loading ? (
        <SectionLoader />
      ) : error ? (
        <Box
          className="flex flex-col items-center justify-center text-center h-[50vh] p-4"
          maxWidth="800px"
          width="80%"
          margin="0 auto"
        >
          <Text className="text-blue-600 text-lg" block bold>
            Oops! Something went wrong.
          </Text>
          <Text className="text-gray-600 mb-4">
            We couldn’t fetch the scholarships. Please try again.
          </Text>
          <Button
            onClick={refetch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Retry
          </Button>
        </Box>
      ) : (
        <>
          <div className="text-center my-10">
            <Text bold block className="text-2xl font-bold">
              Scholarships
            </Text>
            <Spacer space="10" />
            <Text>Read more about the scholarship offers in Distinction.</Text>
          </div>
          <div className="grid grid-cols-1 justify-center items-center place-items-center md:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] mx-auto">
            {data?.data?.map((post, index) => (
              <ScholarshipCard key={index} {...post} />
            ))}
          </div>
          {/* To be implemented in next iteration */}
          {/* <div className="flex justify-center p-4">
            <Button className="bg-blue-700 text-white px-4 py-2 rounded-md">
              See More
            </Button>
          </div> */}
        </>
      )}
    </Box>
  );
};

export default Scholarship;
