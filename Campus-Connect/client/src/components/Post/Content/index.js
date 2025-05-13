import React from 'react';
import styled from 'styled-components/macro';
import PostContentTitle from './Title';
import PostContentPreview from './Preview';
import PostContentFullText from './FullText';
import PostContentDetail from './Detail';
import Poll from 'react-polls';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-left: 1px solid ${props => props.theme.border};
  padding: 8px;
  min-width: 0;
`;

const renderContent = props => {
  const pollQuestion = 'Is react-polls useful?'
  const pollAnswers = [
    { option: 'Yes', votes: 8 },
    { option: 'No', votes: 2 }
  ]
  switch (props.type) {
    case 'link':
      return <PostContentPreview>{props.url}</PostContentPreview>;

    case 'text':
      if (props.showFullPost) {
        return <PostContentFullText>{props.text}</PostContentFullText>;
      }
      return <PostContentPreview>{props.text}</PostContentPreview>;
    case 'poll':
      if (props.showFullPost) {
        return <PostContentFullText>{props.text}</PostContentFullText>;
      }
      return <Poll question={'Is react-polls useful?'} answers={[
        { option: 'Yes', votes: 8 },
        { option: 'No', votes: 2 }
      ] } />;

    default:
      break;
  }
};

const PostContent = ({
  url,
  title,
  type,
  text,
  commentCount,
  showFullPost,
  ...details
}) => (
  <Wrapper>
    
    <PostContentTitle
      url={url}
      title={title}
      type={type}
      full={showFullPost}
      {...details}
    />
    {renderContent({ type, url, text, showFullPost })}
    
    <PostContentDetail commentCount={commentCount} {...details} />
  </Wrapper>
);

export default PostContent;
