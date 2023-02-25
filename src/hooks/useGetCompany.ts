import axios from 'axios';
import { useQuery } from 'react-query';
import { QueryKeys } from 'src/queryClient';

const getCompanyList = async () => {
  try {
    const response = await axios.get(`/my/companies`);
    return response;
  } catch (err) {
    console.log('err', err);
  }
};

const useGetCompany = () => {
  const { data: company, isLoading } = useQuery(QueryKeys.company, getCompanyList, { staleTime: 0, cacheTime: 1000 });

  return { company, isLoading };
};

export default useGetCompany;
