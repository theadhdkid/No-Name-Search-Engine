import { useState } from 'react';
import './App.css';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

// must import the routes!!
import SignIn from './pages/SignIn.jsx';
import Test from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';

import { Routes, Route, BrowserRouter } from 'react-router-dom' // React is used for a 1 page website
//Routes is what allows the website to be 1 page, we just stay within app but reload routes

function App () {
  const [count, setCount] = useState(0);
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          {/*<Route path="/" element={<SignIn />}/>*/}
          {/*<Route path="/SignUp" element={<Test />}/>*/}
          <Route path="/" element={<Home />}/>

        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
