import React from 'react';
import styled from '@emotion/styled';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profile = () => {
  return (
    <UserWrapper>
      <FontAwesomeIcon icon={faUserCircle} color="gray" size="lg" />
      <UserName>홍길동</UserName>
    </UserWrapper>
  );
};

export default Profile;

const UserWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserName = styled.div`
  margin-left: 5px;
  margin-right: 20px;
  font-weight: 400;
`;
