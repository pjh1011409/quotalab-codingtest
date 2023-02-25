import React from 'react';
import styled from '@emotion/styled';
import { Chart } from 'react-google-charts';
import useGetStakeholder, { Stakeholder } from 'src/hooks/useGetStakeholder';
import useGetCompany from 'src/hooks/useGetCompany';

const DonutChart = () => {
  const { shareholderlist } = useGetStakeholder();
  const { company } = useGetCompany();

  const data: (string | number)[][] = [['Task', 'Hours per Day']];

  const options = { pieHole: 0.4, is3D: false };

  shareholderlist?.data.map((s: Stakeholder) =>
    data.push([s.name, (s.stockAmount / company?.data.totalStockAmount) * 100])
  );

  return (
    <ChartWrapper>
      <Chart chartType="PieChart" width="100%" height="400px" data={data} options={options} />
    </ChartWrapper>
  );
};

export default DonutChart;

export const ChartWrapper = styled.div`
  width: full;
  min-height: 298px;
  height: auto;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.03);
  padding: 24px;

  @media (max-width: 500px) {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 12px;
    overflow-y: scroll;
  }
`;
