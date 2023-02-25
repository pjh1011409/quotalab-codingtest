import React from 'react';
import styled from '@emotion/styled';
import TopMenu from './TopMenu';
import Table from './Table';

const StakeholderList = () => {
  return (
    <Container>
      <TopMenu />
      <Table />
    </Container>
  );
};

export default StakeholderList;

const Container = styled.div`
  width: 900px;
  margin: 0 auto;
  @media (max-width: 500px) {
    width: 450px;
  }
`;
