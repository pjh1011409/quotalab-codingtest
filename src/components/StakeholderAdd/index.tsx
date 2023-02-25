import React from 'react';
import AddForm from './AddForm';
import TopMenu from './TopMenu';
import styled from '@emotion/styled';

const StakeholderAdd = () => {
  return (
    <Container>
      <TopMenu />
      <AddForm />
    </Container>
  );
};

export default StakeholderAdd;

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  @media (max-width: 500px) {
    width: 450px;
  }
`;
