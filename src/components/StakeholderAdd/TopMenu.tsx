import React from 'react';
import styled from '@emotion/styled';

const TopMenu = () => {
  return (
    <>
      <TopMenuWrapper>
        <Title>주주 추가하기</Title>
      </TopMenuWrapper>
    </>
  );
};

export default TopMenu;

const TopMenuWrapper = styled.div`
  width: full;
  height: 70px;
`;

const Title = styled.div`
  color: rgb(51, 51, 51);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-weight: 700;
  padding: 24px 0px 20px 0px;
  text-align: left;
`;
