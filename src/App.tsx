import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Vocab } from './pages/Vocab';
import { Grammar } from './pages/Grammar';
import { Speaking } from './pages/Speaking';
import { Reading } from './pages/Reading';
import { Quiz } from './pages/Quiz';
import { Mistakes } from './pages/Mistakes';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="vocab" element={<Vocab />} />
          <Route path="grammar" element={<Grammar />} />
          <Route path="speaking" element={<Speaking />} />
          <Route path="reading" element={<Reading />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="mistakes" element={<Mistakes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;