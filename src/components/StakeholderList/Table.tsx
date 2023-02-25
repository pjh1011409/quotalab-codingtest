import React from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import useGetStakeholder, { Stakeholder, StockAmount } from 'src/hooks/useGetStakeholder';
import { SkeletonListUI } from '../LoadUI/Skeleton';
import useGetCompany from 'src/hooks/useGetCompany';

const Table = () => {
  const { shareholderlist, isLoading } = useGetStakeholder();
  const { company } = useGetCompany();
  const sumAmount: number[] = [];

  const totalAmount = () => {
    shareholderlist?.data.map((s: Stakeholder) => sumAmount.push(s.stockAmount));
    return sumAmount.reduce((acc, curr) => acc + curr, 0);
  };

  const commaMark = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (isLoading) return <SkeletonListUI />;

  return (
    <TableWrapper>
      <RootTable>
        <Theader>
          <tr>
            <td className="h1">이름</td>
            <td className="h2">주식 종류</td>
            <td className="h3">보유 수량</td>
            <td className="h4">주당 단가</td>
            <td className="h5">취득일</td>
          </tr>
        </Theader>
        {shareholderlist?.data
          .sort((a: StockAmount, b: StockAmount) => b.stockAmount - a.stockAmount)
          .map((s: Stakeholder) => {
            return (
              <TBody key={s.name}>
                <tr>
                  <td className="b1">
                    {s.name}
                    {(s.stockAmount / company?.data.totalStockAmount) * 100 >= 2 || // 지분율 2% 이상
                    s.stockAmount * s.stockPrice >= 1000000000 ? ( // 총가지 10억 이상
                      <MajorStakeholder>👑 대주주</MajorStakeholder>
                    ) : null}
                  </td>
                  <td className="b2">{s.stockType}</td>
                  <td className="b3">{commaMark(s.stockAmount)}</td>
                  <td className="b4">₩{commaMark(s.stockPrice)}</td>
                  <td className="b5">{dayjs(s.grantedAt).format('YYYY-MM-DD')}</td>
                </tr>
              </TBody>
            );
          })}
        <TFooter>
          <tr>
            <td colSpan={2} className="f1">
              합계
            </td>
            <td className="f2"> {commaMark(totalAmount())}</td>
            <td colSpan={2} />
          </tr>
        </TFooter>
      </RootTable>
    </TableWrapper>
  );
};

export default Table;

export const TableWrapper = styled.div`
  width: full;
  min-height: 380px;
  height: auto;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.03);
  padding: 24px;

  @media (max-width: 500px) {
    width: 90%;
    margin: 0 auto;
    overflow-y: scroll;
  }
`;

const RootTable = styled.table`
  width: 860px;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  border-collapse: collapse;
`;

const Theader = styled.thead`
  background: #f8f8f8;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #979797;

  & > tr > td {
    border: 1px solid #e6e6e6;
  }
  .h1 {
    text-align: left;
    width: 35%;
    padding: 6px 0px 5px 12px;
    border-left: none;
  }
  .h2 {
    text-align: left;
    width: 20%;
    padding: 6px 0px 5px 12px;
  }
  .h3 {
    text-align: right;
    width: 15%;

    padding: 6px 12px 5px 0px;
  }

  .h4 {
    text-align: right;
    width: 15%;

    padding: 6px 12px 5px 0px;
  }
  .h5 {
    text-align: left;
    width: 15%;

    padding: 6px 0px 5px 12px;
    border-right: none;
  }
`;

const MajorStakeholder = styled.span`
  margin: 0px 8px;
  padding: 3px;
  width: 40px;
  height: 10px;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 10px;
  color: #333333;
  background-color: #fff9db;
  border: 1px solid #ffd43b;
  border-radius: 3px;
`;

const TBody = styled.thead`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: #333333;

  & > tr > td {
    border: 1px solid #e6e6e6;
  }
  .b1 {
    text-align: left;
    width: 35%;
    padding: 6px 0px 5px 12px;
    border-left: none;
  }
  .b2 {
    text-align: left;
    width: 20%;
    padding: 6px 0px 5px 12px;
  }
  .b3 {
    text-align: right;
    width: 15%;

    padding: 6px 12px 5px 0px;
  }

  .b4 {
    text-align: right;
    width: 15%;

    padding: 6px 12px 5px 0px;
  }
  .b5 {
    text-align: left;
    width: 15%;

    padding: 6px 0px 5px 12px;
    border-right: none;
  }
`;

const TFooter = styled.thead`
  background: #f8f8f8;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #333333;

  .f1 {
    text-align: left;
    padding: 6px 0px 5px 12px;
    border-right: 1px solid #e6e6e6;
  }
  .f2 {
    text-align: right;
    padding: 6px 12px 5px 0px;
    border-right: 1px solid #e6e6e6;
  }
`;
