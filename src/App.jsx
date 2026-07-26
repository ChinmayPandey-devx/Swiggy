import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CrossSellPrototype from './pages/CrossSellPrototype';
import ZeroRefundPrototype from './pages/ZeroRefundPrototype';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cross-sell" element={<CrossSellPrototype />} />
        <Route path="/zero-refund" element={<ZeroRefundPrototype />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
