import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './components/Registration';
import ToSendNewsletter from './components/ToSendNewsletter';
import Error from './components/Error';
import Index from './components/Index';
function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="/register" element={<Registration />} />
          <Route path="/send" element={<ToSendNewsletter/>}/>
          <Route path="*" element={<Error />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
