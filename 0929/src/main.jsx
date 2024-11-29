import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";
import Detail from "./TodoDetail.jsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* 메인 페이지 */}
        <Route path="/todo/:id" element={<Detail />} /> {/* 상세 페이지 */}
      </Routes>
    </Router>
  </QueryClientProvider>
);
