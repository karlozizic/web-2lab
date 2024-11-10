import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import HomePage from "./HomePage";
import XSSPage from "./XSSPage";
import EvilPage from "./EvilPage";
import LoginDemonstrationPage from "./LoginDemonstrationPage";
import RedirectPage from "./RedirectPage";

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/xss" element={<XSSPage />} />
          <Route path="/evil-page" element={<EvilPage />} />
          <Route path="/login-demonstration" element={<LoginDemonstrationPage />} />
          <Route path="/login-success" element={<RedirectPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </HashRouter>
  );
}

export default App;
