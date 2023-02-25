import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const TopMenu = () => {
  return (
    <>
      <TopMenuWrapper>
        <Title>주주 정보</Title>
        <Link to="/stakeholderAdd" style={{ textDecorationLine: 'none' }}>
          <AddButton>
            <div>주주 추가</div>
          </AddButton>
        </Link>
      </TopMenuWrapper>
    </>
  );
};

export default TopMenu;

const TopMenuWrapper = styled.div`
  width: full;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const AddButton = styled.div`
  margin-left: auto;
  width: 72px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 18px;
  font-family: 'Spoqa Han Sans Neo';
  background: #00bf83;
  border-radius: 6px;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #ffffff;
    color: #00bf83;
  }
`;
