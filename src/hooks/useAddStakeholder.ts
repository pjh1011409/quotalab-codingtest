import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

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

  const { mutate: onCreate } = useMutation(
    ({ name, stockType, stockAmount }: MutableStakeholder) => addStakeholderFetch({ name, stockType, stockAmount }),
    {
      onSuccess: () => {
        navigate('/');
      },
    }
  );
  return { onCreate };
};

export default useAddStakeholder;
