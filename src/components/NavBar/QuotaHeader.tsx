import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const QuotaHeader = () => {
  return (
    <QuotaHeaderWrapper>
      <Link to="/">
        <Logo src="logo.png" alt="쿼타북 로고" />
      </Link>
    </QuotaHeaderWrapper>
  );
};

export default QuotaHeader;

const QuotaHeaderWrapper = styled.div`
  display: flex;
  margin: 20px 5px 20px 20px;
  width: 124px;
`;

const Logo = styled.img`
  width: 130px;
`;
