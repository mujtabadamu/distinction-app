import { Text, Spacer, Button } from '@flexisaf/flexibull2';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from './blogs';
import React from 'react';
import { DISTINCTION_RESOURCE_BASE_URL } from 'utils/constants';

export const BlogsCard: React.FC<BlogPost> = ({
  documentId,
  blogTitle,
  blogContent,
  blogImage,
}) => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate(`/blog/${documentId}`);
  };

  return (
    <div
      onClick={redirect}
      className="max-w-[350px] cursor-pointer  w-full h-[350px] rounded-md p-1"
    >
      <img
        className="w-[100%] h-[70%] rounded-md"
        src={
          blogImage
            ? `${DISTINCTION_RESOURCE_BASE_URL}${blogImage?.url}`
            : 'https://img.freepik.com/free-photo/book-with-green-board-background_1150-3837.jpg?t=st=1742243599~exp=1742247199~hmac=ad91697508d79523902db9d3af7365ad4b63da06227fb5ddbfe1421a103eafab&w=2000'
        }
        alt={blogTitle}
      />
      <div>
        <Spacer space="10" />
        <Text block className="text-[16px] font-bold">
          {blogTitle}
        </Text>
        <Spacer space="5" />
        <Text
          block
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordWrap: 'break-word',
          }}
        >
          {blogContent}
        </Text>
        <Spacer space="10" />
        <Button pale onClick={redirect}>
          Read more
        </Button>
      </div>
    </div>
  );
};
