import React from 'react';
import styled from '@emotion/styled';

const Table = () => {
  return (
    <TableWrapper>
      <RootTable>
        <Theader>
          <td className="h1">이름</td>
          <td className="h2">주식 종류</td>
          <td className="h3">보유 수량</td>
          <td className="h4">주당 단가</td>
          <td className="h5">취득일</td>
        </Theader>
        <TBody>
          <td className="b1">1</td>
          <td className="b2">1</td>
          <td className="b3">1</td>
          <td className="b4">1</td>
          <td className="b5">1</td>
        </TBody>
        <TFooter>
          <td colSpan={2} className="f1">
            Total
          </td>
          <td className="f2">숫자</td>
          <td colSpan={2} />
        </TFooter>
      </RootTable>
    </TableWrapper>
  );
};

export default Table;

const TableWrapper = styled.div`
  width: full;
  min-height: 380px;
  height: auto;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.03);
  padding: 24px;
  @media (max-width: 500px) {
    width: 90%;
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
  & > td {
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

const TBody = styled.thead`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: #979797;
  & > td {
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
