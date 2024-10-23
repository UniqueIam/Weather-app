import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Content from './components/Content/Content';
import Location from './components/Location/Location';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content" element={<Content />} />
        <Route path="/Location" element={<Location />}/>
      </Routes>
    </Router>
  );
}

export default App;
