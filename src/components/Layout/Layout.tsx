import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='flex h-screen w-full flex-col overflow-hidden'>
      <Outlet />
    </div>
  );
}
