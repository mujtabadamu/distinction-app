import { Box, Text, Button, Spacer } from '@flexisaf/flexibull2';
import NavBar from 'components/landing/navBar.component';
import useFetch from 'pages/resource/hooks/useFetch';
// import {
//   BsInstagram,
//   BsLinkedin,
//   BsTwitterX,
//   BsWhatsapp,
// } from 'react-icons/bs';
// import { FaFacebook } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { DISTINCTION_RESOURCE_BASE_URL } from 'utils/constants';
import { BlogPost, PaginationMeta } from './blogs';
import SectionLoader from 'components/custom/sectionLoader';

const homePageLinks = [
  { link: '/home', name: 'Home' },
  { link: '/resource', name: 'Resource' },
  { link: '/quizathon', name: 'Quizathon' },
];

type BlogResponse = {
  data: BlogPost;
  meta: {
    pagination: PaginationMeta;
  };
};

const Blog = () => {
  const { id } = useParams();

  const { loading, error, data, refetch } = useFetch<BlogResponse>(
    `${DISTINCTION_RESOURCE_BASE_URL}/api/blogs/${id}?populate=*`
  );

  return (
    <>
      <NavBar navLinks={homePageLinks} />
      <Spacer space="20" />

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
            We couldn’t fetch the blog post. Please try again.
          </Text>
          <Button
            onClick={refetch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Retry
          </Button>
        </Box>
      ) : (
        <Box className="p-4" maxWidth="1200px" width="80%" margin="0 auto">
          <Text className="text-xl text-center" block bold>
            {data?.data?.blogTitle || 'Untitled Post'}
          </Text>
          <Spacer space="20" />
          {data?.data?.blogImage && (
            <>
              <img
                className="w-full h-auto max-w-full object-fill sm:h-64 md:h-80 lg:h-[30rem]"
                src={`${DISTINCTION_RESOURCE_BASE_URL}${data?.data.blogImage?.url}`}
                loading="lazy"
                alt="Post_Image"
              />
              <Spacer space="15" />
            </>
          )}
          <ReactMarkdown>
            {data?.data?.blogContent || 'No content available.'}
          </ReactMarkdown>
          <Spacer space="15" />
          <div className="border border-black" />
          <Spacer space="20" />
          {/* To be implemented in next iteration */}

          {/* <Text block bold>
         Share this post
       </Text>
       <div className="flex flex-wrap items-center gap-2 w-fit my-3 justify-between">
         <Button>Copy Link</Button>
         <div className="bg-[#dde5f5f7] rounded-md p-3">
           <BsInstagram size={20} />
         </div>
         <div className="bg-[#dde5f5f7] rounded-md p-3">
           <FaFacebook size={20} />
         </div>
         <div className="bg-[#dde5f5f7] rounded-md p-3">
           <BsTwitterX size={20} />
         </div>
         <div className="bg-[#dde5f5f7] rounded-md p-3">
           <BsWhatsapp size={20} />
         </div>
         <div className="bg-[#dde5f5f7] rounded-md p-3">
           <BsLinkedin size={20} />
         </div>
       </div>
       <Spacer space="15" />
       <Text className="text-xl text-center my-3" block bold>
         Recent Post
       </Text>
       <div
         className="
         grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-30
         justify-center items-center place-items-center w-[100%] m-auto
         "
       >
         {blogPosts.map((post, index) => (
           <BlogsCard
             key={index}
             time={post.time}
             imgUrl={post.imgUrl}
             title={post.title}
             id={post.id}
           />
         ))}
       </div> */}
        </Box>
      )}
    </>
  );
};

export default Blog;
