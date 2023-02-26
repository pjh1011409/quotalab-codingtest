import React from 'react';
import styled from '@emotion/styled';
import TopMenu from './TopMenu';
import Table from './Table';
import DonutChart from '../DonutChart';

const StakeholderList = () => {
  return (
    <Container>
      <TopMenu />
      <DonutChart />
      <Table />
    </Container>
  );
};

export default StakeholderList;

const Container = styled.div`
  width: 900px;
  margin: 0 auto;
  padding-bottom: 99px;

  @media (max-width: 500px) {
    width: 450px;
  }
`;
