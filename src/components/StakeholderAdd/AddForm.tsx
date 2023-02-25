import React, { useState } from 'react';
import styled from '@emotion/styled';
import useInput from 'src/hooks/useInput';
import useAddStakeholder from 'src/hooks/useAddStakeholder';
import { useCustomToast } from 'src/hooks/useCustomToast';
import { Select } from '@chakra-ui/react';

const AddForm = () => {
  const { onCreate } = useAddStakeholder();
  const [name, onChangeName] = useInput('');
  const [stockType, setStockType] = useState('');
  const [stockAmount, onChangeStockAmount] = useInput(0);
  const isActive = name && stockType && stockAmount;
  const toast = useCustomToast();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStockType(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isActive) {
      onCreate({ name, stockType, stockAmount });
    } else {
      toast({
        title: '모든 정보를 입력해주세요.',
        status: 'warning',
        isClosable: true,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <AddFormBox>
          <StakeholderName>
            주주 이름 <span style={{ color: '#FF8787' }}>*</span>
          </StakeholderName>
          <StakeholderNameInput name="name" type="text" placeholder="이름 입력" onChange={onChangeName} />
          <AlertText>기관 투자를 받은 경우엔 기관명, 펀드 투자를 받은 경우엔 펀드명을 입력해주세요.</AlertText>
          <Column>
            <div>
              <StockType>
                주식 종류 <span style={{ color: '#FF8787' }}>*</span>
              </StockType>
              <StockTypeInput>
                <Select
                  value={stockType}
                  onChange={handleChange}
                  placeholder="주식 종류 선택"
                  style={{ fontSize: '14px', color: '#333333' }}
                  size="lg"
                >
                  <option value="보통주식">보통주식</option>
                  <option value="상환전환우선주식 1종">상환전환우선주식 1종</option>
                  <option value="상환전환우선주식 2종">상환전환우선주식 2종</option>
                  <option value="상환전환우선주식 3종">상환전환우선주식 3종</option>
                </Select>
              </StockTypeInput>
            </div>
            <div>
              <StockAmount>
                주식 수량 <span style={{ color: '#FF8787' }}>*</span>
              </StockAmount>
              <StockAmountInput
                name="stockAmount"
                type="number"
                min={1}
                placeholder="수량 입력"
                onChange={onChangeStockAmount}
              ></StockAmountInput>
            </div>
          </Column>
        </AddFormBox>
        <SubmitButtonWrapper>
          <Button type="submit">추가하기</Button>
        </SubmitButtonWrapper>
      </form>
    </>
  );
};

export default AddForm;

const AddFormBox = styled.div`
  width: full;
  height: 240px;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.03);
  border-radius: 8px;
`;

const StakeholderName = styled.div`
  color: #666666;
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
`;

const StakeholderNameInput = styled.input`
  margin: 6px 0px;
  padding: 15px 16px;
  text-align: left;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #333333;
`;

const AlertText = styled.div`
  width: 100%;
  height: 16px;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #979797;
`;

const Column = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StockType = styled.div`
  margin-top: 34px;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #666666;
`;

const StockTypeInput = styled.div`
  margin: 4px 0px;
  width: 100%;
  height: 48px;
  color: #333333;
`;

const StockAmount = styled.div`
  margin-top: 34px;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #666666;
`;

const StockAmountInput = styled.input`
  margin: 4px 0px;
  margin-left: 4px;
  padding: 15px 16px;
  text-align: left;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #333333;
`;

const SubmitButtonWrapper = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 72px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 18px;
  font-family: 'Spoqa Han Sans Neo';
  background: #00bf83;
  border: none;
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
