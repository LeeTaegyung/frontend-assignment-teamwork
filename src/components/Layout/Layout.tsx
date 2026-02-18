import { Outlet } from 'react-router-dom';

import Header from '@/components/Header/Header';

export default function Layout() {
  return (
    <div className='flex h-screen w-full flex-col overflow-hidden'>
      <Header />
      <main className='flex-1 overflow-hidden'>
        <Outlet />
      </main>
    </div>
  );
}
