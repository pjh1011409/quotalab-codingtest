import axios from 'axios';
import { useQuery } from 'react-query';
import { QueryKeys } from 'src/queryClient';

export interface StockAmount {
  stockAmount: number;
}

export interface Stakeholder {
  name: string;
  stockType: string;
  stockAmount: number;
  stockPrice: number;
  grantedAt: number;
}
async function getShareholderList() {
  try {
    const response = await axios.get(`/stakeholders`);
    return response;
  } catch (err) {
    console.log('err', err);
  }
}

const useGetStakeholder = () => {
  const { data: shareholderlist, isLoading } = useQuery(QueryKeys.stakeholder, getShareholderList, {
    staleTime: 0,
    cacheTime: 1000,
  });

  return { shareholderlist, isLoading };
};

export default useGetStakeholder;
