import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { AccessGuard } from './components/AccessGuard';
import { AudioUnlocker } from './components/AudioUnlocker';
import { Home } from './pages/Home';
import { Vocab } from './pages/Vocab';
import { Speaking } from './pages/Speaking';
import { Reading } from './pages/Reading';
import { Grammar } from './pages/Grammar';
import { Quiz } from './pages/Quiz';
import { Mistakes } from './pages/Mistakes'; 
import { Dictation } from './pages/Dictation';

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
    case '/dictation':
      page = <Dictation />;
      break;
    case '/mistakes':
      page = <Mistakes />;
      break;
    default:
      // Equivalent to Navigate to="/"
      page = <Home />;
      break;
  }

  return (
    <AccessGuard>
      <AudioUnlocker />
      <Layout currentPath={currentPath}>
        {page}
      </Layout>
    </AccessGuard>
  );
}

export default App;