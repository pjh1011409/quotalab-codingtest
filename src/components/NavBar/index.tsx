import React from 'react';
import styled from '@emotion/styled';
import { CompanySelect } from './CompanySelect';
import { Profile } from './Profile';
import { QuotaHeader } from './QuotaHeader';

export const NavBar = () => {
  return (
    <NavBarWrapper>
      <QuotaHeader />
      <Line />
      <CompanySelect />
      <Profile />
    </NavBarWrapper>
  );
};

const NavBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.02);
  background-color: #ffffff;
`;

const Line = styled.div`
  width: 20px;
  height: 0px;
  border: 1px solid #dedfe1;
  transform: rotate(90deg);
`;
