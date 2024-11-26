import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Detail from './TodoDetail.jsx';
import './index.css';
import TodoContextProvider from './context/TodoContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TodoContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* 메인 페이지 */}
        <Route path="/todo/:id" element={<Detail />} /> {/* 상세 페이지 */}
      </Routes>
    </Router>
  </TodoContextProvider>
);
