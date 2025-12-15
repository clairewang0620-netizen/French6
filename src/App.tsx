import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { AccessGuard } from './components/AccessGuard';
import { Home } from './pages/Home';
import { Vocab } from './pages/Vocab';
import { Speaking } from './pages/Speaking';
import { Reading } from './pages/Reading';
import { Grammar } from './pages/Grammar';
import { Quiz } from './pages/Quiz';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      // slice(1) removes the '#'
      setCurrentPath(window.location.hash.slice(1) || '/');
    };

    // Initialize logic
    if (!window.location.hash) {
        window.location.hash = '#/';
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  let page;
  switch (currentPath) {
    case '/':
      page = <Home />;
      break;
    case '/vocab':
      page = <Vocab />;
      break;
    case '/speaking':
      page = <Speaking />;
      break;
    case '/reading':
      page = <Reading />;
      break;
    case '/grammar':
      page = <Grammar />;
      break;
    case '/quiz':
      page = <Quiz />;
      break;
    default:
      // Equivalent to Navigate to="/"
      page = <Home />;
      break;
  }

  // 🛡️ 使用 AccessGuard 包裹整个 Layout
  return (
    <AccessGuard>
      <Layout currentPath={currentPath}>
        {page}
      </Layout>
    </AccessGuard>
  );
}

export default App;