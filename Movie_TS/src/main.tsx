import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

// 루트 엘리먼트를 가져옴
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Failed to find the root element");
}

// React 애플리케이션 렌더링
createRoot(rootElement).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>,
);