import { Box, Text, Button, Spacer } from '@flexisaf/flexibull2';
import { BlogsCard } from './blogs-card';
import useFetch from 'pages/resource/hooks/useFetch';
import { DISTINCTION_RESOURCE_BASE_URL } from 'utils/constants';
import SectionLoader from 'components/custom/sectionLoader';

export type BlogPost = {
  id: number;
  documentId: string;
  blogTitle: string;
  blogContent: string;
  publishedDate: string;
  author: string;
  blogId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blogImage: any;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

type BlogResponse = {
  data: BlogPost[];
  meta: {
    pagination: PaginationMeta;
  };
};

const Blogs = () => {
  const { loading, error, data, refetch } = useFetch<BlogResponse>(
    `${DISTINCTION_RESOURCE_BASE_URL}/api/blogs?populate=*`
  );

  return (
    <Box>
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
            We couldn’t fetch the blog posts. Please try again.
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
          <div className="text-center my-4 w-[95%] m-auto md:w-full ">
            <Text bold block className="text-2xl font-bold">
              Latest News
            </Text>
            <Spacer space="10" />
            <Text>
              Read more about the amazing things happening in distinction
            </Text>
          </div>
          <Spacer space="20" />
          <div
            className="
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-30
          justify-center items-center place-items-center w-[80%] m-auto
          "
          >
            {data?.data?.map((blog) => (
              <BlogsCard key={blog.id} {...blog} />
            ))}
          </div>
          <Spacer space="100" />
          {/* To be implemented in next iteration */}

          {/* <div className="flex justify-center p-3">
         <Button>See More</Button>    
      </div> */}
        </>
      )}
    </Box>
  );
};

export default Blogs;
