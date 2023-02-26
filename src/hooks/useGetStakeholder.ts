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
const getStakeholderList = async () => {
  try {
    const response = await axios.get(`/stakeholders`);
    return response;
  } catch (err) {
    console.log('err', err);
  }
};

const useGetStakeholder = () => {
  const { data: stakeholderlist, isLoading } = useQuery(QueryKeys.stakeholder, getStakeholderList, {
    staleTime: 300000, // 5분
    cacheTime: 300000, // 5분
  });

  return { stakeholderlist, isLoading };
};

export default useGetStakeholder;
