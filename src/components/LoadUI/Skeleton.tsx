import React from 'react';
import { Skeleton, Stack, SkeletonCircle } from '@chakra-ui/react';
import { TableWrapper } from '../StakeholderList/Table';
import styled from '@emotion/styled';

export const SkeletonListUI = () => {
  const numberOfSkeletons = 10;

  return (
    <TableWrapper>
      <Stack>
        {Array.from(new Array(numberOfSkeletons)).map((item, i) => (
          <Skeleton key={i} height="25px" startColor="gray.100" endColor="gray.200" />
        ))}
      </Stack>
    </TableWrapper>
  );
};

export const SkeletoncSelectUI = () => {
  return (
    <>
      <SkeletonCircle size="6" />
      <Container>
        <Skeleton width="140px" height="25px" startColor="gray.100" endColor="gray.200" />
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 0px 15px;
`;
