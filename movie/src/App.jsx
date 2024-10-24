import './App.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import MoviesPage from "./pages/movies.jsx";
import RootLayout from "./layout/root-layout.jsx";
import SignUpPage from "./pages/signUp.jsx";
import LoginPage from './pages/login.jsx';
import SearchPage from './pages/search.jsx';
import CategoryPage from './pages/category.jsx';
import MovieDetailPage from './pages/movieDetail.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <MoviesPage category="popular" />, // 기본 카테고리 설정
            },
            {
                path: 'movie/:category', // 카테고리 매개변수 설정
                element: <MoviesPage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/signup',
                element: <SignUpPage />,
            },
            {
                path: '/search',
                element: <SearchPage />,
            },
            {
                path: '/category',
                element: <CategoryPage />,
            },
            {
                path: 'movie/details/:movieId',
                element: <MovieDetailPage />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
