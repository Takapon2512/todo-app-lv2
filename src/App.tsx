import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil'

import './App.css';

import { Home } from './Pages/Home';
import { Tasks } from './Pages/Tasks';

const App: React.FC = () => {
  return (
    <>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='tasks' element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
    </>
  );
}

export default App;
