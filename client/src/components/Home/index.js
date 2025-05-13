import React from 'react';
import styled from 'styled-components/macro';
import { Route } from 'react-router-dom';
import HomeMainSection from './MainSection';
import CategoryMenuContainer from '../CategoryMenu/Container';
import PostListContainer from '../PostList/Container';
import PostListContainerVotes from '../PostList/ContainerVotes';
import PostDetailContainer from '../PostDetail/Container';
import SidebarContainer from '../Sidebar/Container';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Avatar, Flex, Heading } from '@chakra-ui/react';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 10vw;

  @media (max-width: 1024px) {
    margin: 0 5vw;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0;
  }
`;

const Home = () => (
  <Wrapper>
    <HomeMainSection>
      <Route component={CategoryMenuContainer} />
      <Route exact path='/' component={PostListContainer} />
      <Route
        exact
        path='/a/:category'
        render={({ match }) => {
          return (
            <div>
              <Tabs variant='soft-rounded' colorScheme='blue'>
                <TabList>
                  <Tab>By Date</Tab>
                  <Tab>By Votes</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <PostListContainer category={match.params.category} />
                  </TabPanel>
                  <TabPanel>
                  <PostListContainerVotes category={match.params.category} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          );
        }}
      />
      <Route
        exact
        path='/u/:username'
        render={({ match }) => (
          <div>
            <Flex alignItems="center" justifyContent="center" >
            <Avatar name={match.params.username}  mr="5"/>
            {match.params.username} 
            
            </Flex>
            <Heading  as='h4' size='md'>Here are all my Posts</Heading>
            <PostListContainer username={match.params.username} />
          </div>
        )}
      />
      <Route
        exact
        path='/a/:category/:post'
        render={({ match, history }) => (
          <PostDetailContainer id={match.params.post} history={history} />
        )}
      />
    </HomeMainSection>
    <Route component={SidebarContainer} />
  </Wrapper>
);

export default Home;
