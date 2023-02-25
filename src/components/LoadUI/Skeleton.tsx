import React from 'react';
import { Skeleton, Stack, SkeletonCircle } from '@chakra-ui/react';
import { TableWrapper } from '../StakeholderList/Table';

export const SkeletonListUI = () => {
  return (
    <TableWrapper>
      <Stack>
        {Array.from(new Array(10)).map((item, i) => (
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
      <Stack
        style={{
          margin: '0px 15px',
        }}
      >
        <Skeleton width="140px" height="25px" startColor="gray.100" endColor="gray.200" />
      </Stack>
    </>
  );
};
