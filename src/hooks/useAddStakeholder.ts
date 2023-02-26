import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QueryKeys } from 'src/queryClient';

interface MutableStakeholder {
  name: string;
  stockType: string;
  stockAmount: number;
}

const addStakeholderFetch = async ({ name, stockType, stockAmount }: MutableStakeholder) => {
  try {
    await axios.post('/stakeholders', {
      name,
      stockType,
      stockAmount,
    });
  } catch (err) {
    console.log('error', err);
  }
};

const useAddStakeholder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createStakeholder } = useMutation(
    ({ name, stockType, stockAmount }: MutableStakeholder) => addStakeholderFetch({ name, stockType, stockAmount }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.stakeholder);
        navigate('/');
      },
    }
  );
  return { createStakeholder };
};

export default useAddStakeholder;
