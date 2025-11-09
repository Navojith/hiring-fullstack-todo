import { createBrowserRouter } from 'react-router';
import TodoRoutes from './subroutes/Todo.subroutes';
import RootLayout from '@/components/RootLayout';
import HomeRoutes from './subroutes/Home.subroutes';
import AboutRoutes from './subroutes/About.subroutes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [HomeRoutes, TodoRoutes, AboutRoutes],
  },
]);
