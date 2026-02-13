import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routes from '@/routes.tsx';
const router = createBrowserRouter(routes);

import '@/styles/global.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
