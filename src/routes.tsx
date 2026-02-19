import Layout from '@/components/Layout/Layout';
import DrawingPage from '@/pages/DrawingPage/DrawingPage';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import MainPage from '@/pages/MainPage/MainPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/drawing/:id', element: <DrawingPage /> },
    ],
  },
];

export default routes;
