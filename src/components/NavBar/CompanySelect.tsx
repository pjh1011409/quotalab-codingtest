import React from 'react';
import styled from '@emotion/styled';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select } from 'antd';

export const CompanySelect = () => {
  return (
    <>
      <BuildingLogo>
        <FontAwesomeIcon icon={faBuilding} color="gray" />
      </BuildingLogo>
      <Select
        style={{ margin: '0px 5px', width: '140px', textAlign: 'center' }}
        defaultValue={'주식회사 벨코즈'}
        options={[{ value: `1`, label: '주식회사 벨코즈' }]}
      />
    </>
  );
};

const BuildingLogo = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f8f8f8;
  border: 1px solid #dedfe1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
`;
