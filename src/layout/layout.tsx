import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router';
import styled from '@emotion/styled';

const Layout = () => {
  return (
    <RootWrapper>
      <NavBar />
      <Outlet />
    </RootWrapper>
  );
};

export default Layout;

const RootWrapper = styled.div`
  min-height: 100vh;
  background-color: rgb(248, 248, 248);
  position: relative;
`;
