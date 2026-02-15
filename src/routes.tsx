import Layout from '@/components/Layout/Layout';
import DrawingPage from '@/pages/DrawingPage/DrawingPage';
import MainPage from '@/pages/MainPage/MainPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/drawing/:id', element: <DrawingPage /> },
    ],
  },
];

export default routes;
