import React from 'react';
import { Spin } from 'antd';
import styled from '@emotion/styled';

export const LoadSpinner = () => {
  return (
    <SpinnerWrapper>
      <Spin size="large" />
    </SpinnerWrapper>
  );
};

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 530px;
`;
