import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Vocab } from './pages/Vocab';
import { Speaking } from './pages/Speaking';
import { Reading } from './pages/Reading';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="vocab" element={<Vocab />} />
          <Route path="speaking" element={<Speaking />} />
          <Route path="reading" element={<Reading />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;