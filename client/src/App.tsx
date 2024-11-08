import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import HomePage from "./HomePage";
import XSSPage from "./XSSPage";
import EvilPage from "./EvilPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/xss" element={<XSSPage />} />
          <Route path="/evil-page" element={<EvilPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
