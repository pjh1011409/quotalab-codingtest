import * as React from 'react';

import { Space, Spin } from 'antd';

export const LoadSpinner = () => {
  return (
    <div
      style={{
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '530px',
      }}
    >
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
};
