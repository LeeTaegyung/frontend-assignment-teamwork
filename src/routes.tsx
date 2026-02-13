import DrawingPage from '@/pages/DrawingPage/DrawingPage';
import MainPage from '@/pages/MainPage/MainPage';

const routes = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/drawing/:id',
    element: <DrawingPage />,
  },
];

export default routes;
