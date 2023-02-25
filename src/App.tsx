import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoadSpinner } from './components/LoadUI/LoadSpinner';
import Layout from './layout/layout';

const StakeholderListPage = React.lazy(() => import('./pages/stakeholderListPage'));
const StakeholderAddPage = React.lazy(() => import('./pages/stakeholderAddPage'));

const App = () => (
  <Suspense fallback={<LoadSpinner />}>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate replace to="/stakeholderList" />} />
        <Route path="/stakeholderList" element={<StakeholderListPage />} />
        <Route path="/stakeholderAdd" element={<StakeholderAddPage />} />
      </Route>
    </Routes>
  </Suspense>
);

export default App;
