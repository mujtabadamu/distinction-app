import { Box, Text, Button, Spacer } from '@flexisaf/flexibull2';
import { WebinarCard } from './webinar-card';
import useFetch from 'pages/resource/hooks/useFetch';
import { DISTINCTION_RESOURCE_BASE_URL } from 'utils/constants';
import SectionLoader from 'components/custom/sectionLoader';

export type Webinar = {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  speaker: string;
  speakerTeam: string;
  date: string;
  registerUrl: string;
  time: string;
  youtubeRedirect: string;
  webinarId: string;
  speakerImage: any;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

interface WebinarResponse {
  data: Webinar[];
  meta: {
    pagination: PaginationMeta;
  };
}

const Webinars = () => {
  const { loading, error, data, refetch } = useFetch<WebinarResponse>(
    `${DISTINCTION_RESOURCE_BASE_URL}/api/webinars?populate=*`
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
          <div className="text-center my-4">
            <Text bold block className="text-2xl font-bold">
              Webinars and Events
            </Text>
            <Spacer space="10" />
            <Text>Read more about webinars and events in Distinction.</Text>
          </div>
          <Spacer space="30" />
          <div className="grid grid-cols-1 justify-center items-center md:grid-cols-2 lg:grid-cols-3 gap-10 w-[100%] mx-auto place-items-center p-2">
            {data?.data?.map((post, index) => (
              <WebinarCard key={index} {...post} />
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

export default Webinars;
