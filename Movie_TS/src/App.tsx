import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/not-found";
import MoviesPage from "./pages/movies";
import RootLayout from "./layout/root-layout";
import SignUpPage from "./pages/signUp";
import LoginPage from './pages/login';
import SearchPage from './pages/search';
import CategoryPage from './pages/category';
import MovieDetailPage from './pages/movieDetail';
import MainPage from './pages/mainPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <MainPage />, // Main page route
            },
            {
                path: 'movie/:category',
                element: <MoviesPage />, // Movies page route
            },
            {
                path: '/login',
                element: <LoginPage />, // Login page route
            },
            {
                path: '/signup',
                element: <SignUpPage />, // Sign-up page route
            },
            {
                path: '/search',
                element: <SearchPage />, // Search page route
            },
            {
                path: '/category',
                element: <CategoryPage />, // Category page route
            },
            {
                path: 'movie/details/:movieId',
                element: <MovieDetailPage />, // Movie details route
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;