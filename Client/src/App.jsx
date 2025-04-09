import { useState } from 'react';
import './App.css';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import SearchResults from './pages/SearchResults.jsx'; // ✅ New import

import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App () {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/SearchResults" element={<SearchResults />} /> {/* ✅ New route */}
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
