import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

export const QuotaHeader = () => {
  return (
    <QuotaHeaderWrapper>
      <Link to="/">
        <img
          src="https://d1g8gmm07nz19n.cloudfront.net/logos/signature_horizon_black.png"
          className={css`
            height: 15px;
            vertical-align: middle;
          `}
          alt="쿼타북 로고"
        />
      </Link>
    </QuotaHeaderWrapper>
  );
};

const QuotaHeaderWrapper = styled.div`
  display: flex;
  margin: 20px 5px 20px 20px;
  width: 124px;
`;
